import pool from "../config/db.js"

class StudentService {
    async getAllStudents() {
        try {
            let students = await pool.query(`SELECT * FROM students WHERE status = 'active'`)
            return {
                status: 200,
                data: students.rows
            }
        } catch (error) {
            return { status: 500, message: error.message }
        }
    }

    async getOneStudent(id) {
        try {
            let student = await pool.query(`SELECT * FROM students WHERE id = $1 AND status = 'active'`, [id])
            if (!student.rows.length) {
                return { status: 404, message: "Student not found" }
            }
            return { status: 200, data: student.rows[0] }
        } catch (error) {
            return { status: 500, message: error.message }
        }
    }

    async createStudent(req) {
        try {
            let { fullname, phone, course_id } = req.body

            let checkPhone = await pool.query(`SELECT * FROM students WHERE phone = $1`, [phone])
            if (checkPhone.rows.length) {
                return { status: 400, message: "This phone number is already registered" }
            }

            
            let checkCourse = await pool.query(`SELECT * FROM courses WHERE id = $1`, [course_id])
            if (!checkCourse.rows.length) {
                return { status: 400, message: "Course not found" }
            }

            await pool.query(
                `INSERT INTO students (fullname, phone, course_id) VALUES ($1, $2, $3)`,
                [fullname, phone, course_id]
            )

            return { status: 201, message: "Student added successfully!" }
        } catch (error) {
            return { status: 500, message: error.message }
        }
    }

    async updateStudent(id, req) {
        try {
            let { fullname, phone, course_id } = req.body

            let checkStudent = await pool.query(`SELECT * FROM students WHERE id = $1`, [id])
            if (!checkStudent.rows.length) {
                return { status: 404, message: "Student not found" }
            }

            
            await pool.query(
                `UPDATE students 
                 SET fullname = COALESCE($1, fullname),
                     phone = COALESCE($2, phone),
                     course_id = COALESCE($3, course_id)
                 WHERE id = $4`,
                [fullname, phone, course_id, id]
            )

            return { status: 200, message: "Student updated successfully!" }
        } catch (error) {
            return { status: 500, message: error.message }
        }
    }

    async deleteStudent(id) {
        try {
            let checkStudent = await pool.query(`SELECT * FROM students WHERE id = $1`, [id])
            if (!checkStudent.rows.length) {
                return { status: 404, message: "Student not found" }
            }

            
            await pool.query(`UPDATE students SET status = 'inactive' WHERE id = $1`, [id])

            return { status: 200, message: "Student set to inactive!" }
        } catch (error) {
            return { status: 500, message: error.message }
        }
    }
}

const studentService = new StudentService()
export default studentService
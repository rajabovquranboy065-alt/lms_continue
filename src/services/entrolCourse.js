import pool from "../config/db.js";

class EnrollService {
    async enrollCourse(req) {
        try {
            let studentId = req.user.id;
            let { course_id } = req.body;

           
            let courseCheck = await pool.query(`SELECT * FROM courses WHERE id = $1`, [course_id]);
            if (!courseCheck.rows.length) {
                return { status: 404, message: "Kurs topilmadi!" };
            }

       
            let existingPurchase = await pool.query(
                `SELECT * FROM purchases WHERE student_id = $1 AND course_id = $2`,
                [studentId, course_id]
            );

            if (existingPurchase.rows.length > 0) {
                return { status: 400, message: "Siz bu kursni allaqachon sotib olgansiz!" };
            }

           
            let newPurchase = await pool.query(
                `INSERT INTO purchases (student_id, course_id) VALUES ($1, $2) RETURNING *`,
                [studentId, course_id]
            );

            return {
                status: 201,
                message: "Kurs muvaffaqiyatli sotip olindi!",
                data: newPurchase.rows[0]
            };
        } catch (error) {
            return { status: 500, message: error.message };
        }
    }
}

export default new EnrollService();
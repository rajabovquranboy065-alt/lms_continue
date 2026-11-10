import pool from "../config/db.js";

class MySectionService {
    async getCourseContentForStudent(req) {
        try {
            let studentId = req.user.id;
            let courseId = req.params.courseId; 

            let purchaseCheck = await pool.query(
                `SELECT * FROM purchases WHERE student_id = $1 AND course_id = $2`,
                [studentId, courseId]
            );

            if (!purchaseCheck.rows.length) {
                return {
                    status: 403,
                    message: "Siz bu kursni sotib olmagansiz!",
                    data: null
                };
            }

            let courseCheck = await pool.query(`SELECT * FROM courses WHERE id = $1`, [courseId]);

            let sections = await pool.query(
                `SELECT * FROM sections WHERE course_id = $1 ORDER BY id ASC`, 
                [courseId]
            );

            return {
                status: 200,
                message: "Kurs bo'limlari muvaffaqiyatli olindi",
                data: {
                    course: courseCheck.rows[0],
                    sections: sections.rows
                }
            };

        } catch (error) {
            return {
                status: 500,
                message: error.message,
                data: null
            };
        }
    }
}

export default new MySectionService();
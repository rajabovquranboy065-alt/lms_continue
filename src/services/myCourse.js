import pool from "../config/db.js";

class MyCourseService {
    async getMyCourses(req) {
        try {
            let studentId = req.user.id;

            let myCourses = await pool.query(
                `
                SELECT c.*, 
                       m.fullname as mentor_name, 
                       m.image as mentor_image,
                       p.created_at as purchased_at
                FROM purchases p
                JOIN courses c ON p.course_id = c.id
                JOIN mentors m ON c.mentor_id = m.id
                WHERE p.student_id = $1
                `,
                [studentId]
            );

            if (myCourses.rows.length === 0) {
                return {
                    status: 200,
                    message: "Siz hali hech qanday kurs sotib olmagansiz",
                    data: []
                };
            }

            return {
                status: 200,
                message: "Sotib olingan kurslar muvaffaqiyatli olindi",
                data: myCourses.rows
            };

        } catch (error) {
            return {
                status: 500,
                message: error.message,
                data: []
            };
        }
    }
}

export default new MyCourseService();
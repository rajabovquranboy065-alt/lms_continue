import pool from "../config/db.js";

class MyMentorCoursesService {
    async getMyCourses(req) {
        try {
            let mentorId = req.user.id;

            let courses = await pool.query(
                `
                SELECT c.*, cat.name as category_name
                FROM courses c
                LEFT JOIN categories cat ON c.category_id = cat.id
                WHERE c.mentor_id = $1
                `,
                [mentorId]
            );

            if (courses.rows.length === 0) {
                return {
                    status: 200,
                    message: "Siz hali hech qanday kurs yaratmagansiz",
                    data: []
                };
            }

            return {
                status: 200,
                message: "Sizning kurslaringiz muvaffaqiyatli olindi",
                data: courses.rows
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

export default new MyMentorCoursesService();
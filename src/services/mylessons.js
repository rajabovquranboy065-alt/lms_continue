import pool from "../config/db.js";

class SectionDetailService {
    async getSectionLessonsWithHomework(req) {
        try {
            let studentId = req.user.id;
            let sectionId = req.params.sectionId;

            let sectionCheck = await pool.query(
                `SELECT * FROM sections WHERE id = $1`, 
                [sectionId]
            );

            if (!sectionCheck.rows.length) {
                return {
                    status: 404,
                    message: "Bo'lim (section) topilmadi!",
                    data: null
                };
            }

            let courseId = sectionCheck.rows[0].course_id;

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

            
            let lessonsWithHomework = await pool.query(
                `
                SELECT 
                    l.id as lesson_id,
                    l.title as lesson_title,
                    l.description as lesson_description,
                    l.videofile,
                    l.created_at as lesson_created_at,
                    h.id as homework_id,
                    h.task as homework_task,
                    h.file as homework_file,
                    h.created_at as homework_created_at
                FROM lessons l
                LEFT JOIN homework h ON l.id = h.lesson_id
                WHERE l.section_id = $1
                ORDER BY l.id ASC
                `,
                [sectionId]
            );

            return {
                status: 200,
                message: "Darslar va uyga vazifalar muvaffaqiyatli olindi",
                data: {
                    section: sectionCheck.rows[0],
                    lessons: lessonsWithHomework.rows
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

export default new SectionDetailService();
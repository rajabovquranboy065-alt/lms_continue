import pool from "../config/db.js";
import path from "path";

class LessonService {
   async getAllLessons() {
        let lessons = await pool.query(`
            SELECT 
                lessons.*, 
                sections.title AS section_name, 
                courses.title AS course_name 
            FROM lessons
            JOIN sections ON lessons.section_id = sections.id
            JOIN courses ON sections.course_id = courses.id
        `);
        
        return {
            status: 200,
            message: "Barcha darslar",
            data: lessons.rows
        };
    }

    async createLesson(req) {
        let { section_id, title, description } = req.body;
        console.log(req.user)
        let mentorId = req.user.id; 

        let sectionCheck = await pool.query(`
            SELECT s.*, c.mentor_id 
            FROM sections s
            JOIN courses c ON s.course_id = c.id
            WHERE s.id = $1
        `, [section_id]);

        if (!sectionCheck.rows.length) {
            return {
                status: 404,
                message: "Bunday section mavjud emas",
                data: null
            };
        }

        if (sectionCheck.rows[0].mentor_id !== mentorId && req.user.role !== 'admin') {
            return {
                status: 403,
                message: "Siz faqat o'zingizning kursingizga dars qo'sha olasiz!",
                data: null
            };
        }

        let videoName = null;
        if (req.files && req.files.videoFile) {
            let file = req.files.videoFile;
            let ext = path.extname(file.name).toLowerCase();
            
            const allowedVideoExtensions = ['.mp4', '.mov', '.mkv', '.avi', '.webm'];
            if (!allowedVideoExtensions.includes(ext)) {
                return {
                    status: 400,
                    message: "Unsupported video format!"
                };
            }

            videoName = Date.now() + ext;
            let uploadPath = path.join(process.cwd(), "src", "utils", "uploads_introVideo", videoName);

            await file.mv(uploadPath);
        }

        let newLesson = await pool.query(
            `INSERT INTO lessons (section_id, title, description, videofile) VALUES ($1, $2, $3, $4) RETURNING *`,
            [section_id, title, description, videoName]
        );

        return {
            status: 201,
            message: "Dars muvaffaqiyatli qo'shildi",
            data: newLesson.rows[0]
        };
    }

    async updateLesson(req) {
        let { id } = req.params;
        let { section_id, title, description } = req.body;
        let mentorId = req.user.id;

        let check = await pool.query(`
            SELECT l.*, c.mentor_id 
            FROM lessons l
            JOIN sections s ON l.section_id = s.id
            JOIN courses c ON s.course_id = c.id
            WHERE l.id = $1
        `, [id]);

        if (!check.rows.length) {
            return {
                status: 404,
                message: "Dars topilmadi"
            };
        }

        if (check.rows[0].mentor_id !== mentorId && req.user.role !== 'admin') {
            return {
                status: 403,
                message: "Siz faqat o'zingizning darsingizni tahrirlay olasiz!"
            };
        }

        let videoName = check.rows[0].videofile;

        if (req.files && req.files.videoFile) {
            let file = req.files.videoFile;
            let ext = path.extname(file.name).toLowerCase();
            
            const allowedVideoExtensions = ['.mp4', '.mov', '.mkv', '.avi', '.webm'];
            if (!allowedVideoExtensions.includes(ext)) {
                return {
                    status: 400,
                    message: "Unsupported video format!"
                };
            }

            videoName = Date.now() + ext;
            let uploadPath = path.join(process.cwd(), "src", "utils", "uploads_introVideo", videoName);

            await file.mv(uploadPath);
        }

        let updated = await pool.query(
            `UPDATE lessons SET section_id = $1, title = $2, description = $3, videofile = $4 WHERE id = $5 RETURNING *`,
            [section_id, title, description, videoName, id]
        );

        return {
            status: 200,
            message: "Dars muvaffaqiyatli tahrirlandi",
            data: updated.rows[0]
        };
    }

    async deleteLesson(req) {
        let { id } = req.params;
        let mentorId = req.user.id;
        let check = await pool.query(`
            SELECT l.*, c.mentor_id 
            FROM lessons l
            JOIN sections s ON l.section_id = s.id
            JOIN courses c ON s.course_id = c.id
            WHERE l.id = $1
        `, [id]);

        if (!check.rows.length) {
            return {
                status: 404,
                message: "Dars topilmadi"
            };
        }

        
        if (check.rows[0].mentor_id !== mentorId && req.user.role !== 'admin') {
            return {
                status: 403,
                message: "Siz faqat o'zingizning darsingizni o'chira olasiz!"
            };
        }

        await pool.query(`DELETE FROM lessons WHERE id = $1`, [id]);

        return {
            status: 200,
            message: "Dars muvaffaqiyatli o'chirildi"
        };
    }

    async getBySectionId(sectionId) {
        try {
            const lessons = await pool.query(
                `SELECT id, section_id, title, description, videofile, created_at FROM lessons WHERE section_id = $1`,
                [sectionId]
            );

            return {
                status: 200,
                message: "Bo'limga tegishli darslar olindi",
                data: lessons.rows
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

export default new LessonService();
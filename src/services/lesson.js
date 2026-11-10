import pool from "../config/db.js";
import path from "path";

class LessonService {
   async getAllLessons() {
    let lessons = await pool.query(`
        SELECT 
            lessons.*, 
            sections.title AS section_name, 
            courses.name AS course_name 
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
        let videoName = null;

        if (req.files && req.files.videoFile) {
            let file = req.files.videoFile;
            videoName = Date.now() + path.extname(file.name);
            let uploadPath = path.join(process.cwd(), "src","utils","uploads_introVideo",videoName);

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

        let check = await pool.query(`SELECT * FROM lessons WHERE id = $1`, [id]);
        if (!check.rows.length) {
            return {
                status: 404,
                message: "Dars topilmadi"
            };
        }

        let videoName = check.rows[0].videofile;

        if (req.files && req.files.videoFile) {
            let file = req.files.videoFile;
            videoName = Date.now() + path.extname(file.name);
            let uploadPath = path.join(process.cwd(),"src","utils","uploads_introVideo", videoName);

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

        let check = await pool.query(`SELECT * FROM lessons WHERE id = $1`, [id]);
        if (!check.rows.length) {
            return {
                status: 404,
                message: "Dars topilmadi"
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
        `SELECT id, section_id, title, description, created_at FROM lessons WHERE section_id = $1`,
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
import pool from "../config/db.js";
import path from "path";
import fs from "fs";

class HomeworkService {
    async getAllHomeworks() {
        let homeworks = await pool.query(`
            SELECT h.*, l.title as lesson_title 
            FROM homework h
            JOIN lessons l ON h.lesson_id = l.id
        `);
        return {
            status: 200,
            message: "Barcha vazifalar",
            data: homeworks.rows
        };
    }

    async createHomework(req) {
        let { lesson_id, task } = req.body;
        
        let lessonCheck = await pool.query(`SELECT * FROM lessons WHERE id = $1`, [lesson_id]);
        if (!lessonCheck.rows.length) {
            return {
                status: 404,
                message: "Dars topilmadi!"
            };
        }

        if (!req.files || !req.files.file) {
            return {
                status: 400,
                message: "Fayl biriktirilishi shart!"
            };
        }

        let uploadedFile = req.files.file;
        let fileExtension = path.extname(uploadedFile.name);
        let fileName = `${Date.now()}${fileExtension}`;
        
        let uploadPath = path.join("src", "utils", "uploads_introVideo", fileName);

        await uploadedFile.mv(uploadPath);

        let newHomework = await pool.query(
            `INSERT INTO homework (lesson_id, task, file) VALUES ($1, $2, $3) RETURNING *`,
            [lesson_id, task, fileName]
        );

        return {
            status: 201,
            message: "Vazifa muvaffaqiyatli qo'shildi",
            data: newHomework.rows[0]
        };
    }

    async deleteHomework(req) {
        let { id } = req.params;

        let check = await pool.query(`SELECT * FROM homework WHERE id = $1`, [id]);
        if (!check.rows.length) {
            return {
                status: 404,
                message: "Vazifa topilmadi!"
            };
        }

        let homework = check.rows[0];
        let filePath = path.join("src", "utils", "uploads_introVideo", homework.file);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await pool.query(`DELETE FROM homework WHERE id = $1`, [id]);

        return {
            status: 200,
            message: "Vazifa muvaffaqiyatli o'chirildi"
        };
    }
}

export default new HomeworkService();
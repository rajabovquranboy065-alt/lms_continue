 import pool from "../config/db.js";

class ExamService {
    async getAllExams() {
        let exams = await pool.query(`
            SELECT e.*, l.title as lesson_title 
            FROM exams e
            JOIN lessons l ON e.lesson_id = l.id
        `);
        return {
            status: 200,
            message: "Barcha imtihon savollari",
            data: exams.rows
        };
    }

    async createExam(req) {
        let { lesson_id, question, option_a, option_b, option_c, option_d, correct_answer } = req.body;
        
        let lessonCheck = await pool.query(`SELECT * FROM lessons WHERE id = $1`, [lesson_id]);
        if (!lessonCheck.rows.length) {
            return {
                status: 404,
                message: "Dars topilmadi!"
            };
        }

        let newExam = await pool.query(
            `INSERT INTO exams (lesson_id, question, option_a, option_b, option_c, option_d, correct_answer) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [lesson_id, question, option_a, option_b, option_c, option_d, correct_answer]
        );

        return {
            status: 201,
            message: "Imtihon savoli muvaffaqiyatli qo'shildi",
            data: newExam.rows[0]
        };
    }

    async updateExam(req) {
        let { id } = req.params;
        let { lesson_id, question, option_a, option_b, option_c, option_d, correct_answer } = req.body;

        let check = await pool.query(`SELECT * FROM exams WHERE id = $1`, [id]);
        if (!check.rows.length) {
            return {
                status: 404,
                message: "Savol topilmadi!"
            };
        }

        let updatedExam = await pool.query(
            `UPDATE exams SET lesson_id = $1, question = $2, option_a = $3, option_b = $4, option_c = $5, option_d = $6, correct_answer = $7 WHERE id = $8 RETURNING *`,
            [lesson_id, question, option_a, option_b, option_c, option_d, correct_answer, id]
        );

        return {
            status: 200,
            message: "Imtihon savoli muvaffaqiyatli yangilandi",
            data: updatedExam.rows[0]
        };
    }

    async deleteExam(req) {
        let { id } = req.params;

        let check = await pool.query(`SELECT * FROM exams WHERE id = $1`, [id]);
        if (!check.rows.length) {
            return {
                status: 404,
                message: "Savol topilmadi!"
            };
        }

        await pool.query(`DELETE FROM exams WHERE id = $1`, [id]);

        return {
            status: 200,
            message: "Imtihon savoli muvaffaqiyatli o'chirildi"
        };
    }
}

export default new ExamService();
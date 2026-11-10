import pool from "../config/db.js";
import path from "path";
import fs from "fs";

class MaterialService {
    async getAllMaterials() {
        let materials = await pool.query(`
            SELECT m.*, l.title as lesson_title 
            FROM materials m
            JOIN lessons l ON m.lesson_id = l.id
        `);
        return {
            status: 200,
            message: "Barcha materiallar",
            data: materials.rows
        };
    }

    async createMaterial(req) {
        console.log(req)
        try {
            let { lesson_id, description } = req.body;
            
            
            let currentUserId = req.user.id
            let userRole = req.user?.role;

            let lessonCheck = await pool.query(
                `SELECT l.*, s.course_id, c.mentor_id 
                 FROM lessons l 
                 JOIN sections s ON l.section_id = s.id 
                 JOIN courses c ON s.course_id = c.id 
                 WHERE l.id = $1`, 
                [lesson_id]
            );

            if (!lessonCheck.rows.length) {
                return {
                    status: 404,
                    message: "Dars topilmadi!"
                };
            }

            let lesson = lessonCheck.rows[0];

            if (userRole !== "Admin" && lesson.mentor_id !== currentUserId) {
                return {
                    status: 403,
                    message: "Siz bu darsga material qo'shish huquqiga ega emassiz!"
                };
            }

            
            if (!req.files.file) {
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

            let newMaterial = await pool.query(
                `INSERT INTO materials (lesson_id, description, file_path) VALUES ($1, $2, $3) RETURNING *`,
                [lesson_id, description, fileName]
            );

            return {
                status: 201,
                message: "Material muvaffaqiyatli qo'shildi",
                data: newMaterial.rows[0]
            };

        } catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }

    async deleteMaterial(req) {
        let { id } = req.params;

        let check = await pool.query(`SELECT * FROM materials WHERE id = $1`, [id]);
        if (!check.rows.length) {
            return {
                status: 404,
                message: "Material topilmadi!"
            };
        }

        let material = check.rows[0];
        let filePath = path.join("src", "utils", "uploads_introVideo", material.file_path);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await pool.query(`DELETE FROM materials WHERE id = $1`, [id]);

        return {
            status: 200,
            message: "Material muvaffaqiyatli o'chirildi"
        };
    }
}

export default new MaterialService();
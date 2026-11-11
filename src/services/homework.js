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
        try {
            let { lesson_id, task } = req.body;
            let currentUserId = req.user.id;
            let userRole = req.user?.role;

            // 1. Dars va uning qaysi kurs hamda mentorga tegishliligini tekshiramiz
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
                    message: "Siz faqat o'zingizning darsingizga uyga vazifa qo'sha olasiz!"
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

        } catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
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
    async getHomeworksByLessonId(lesson_id, reqUser) {
        try {
            let currentUserId = reqUser.id;
            let userRole = reqUser?.role;

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
                    message: "Dars topilmadi",
                    data: []
                };
            }

            let lesson = lessonCheck.rows[0];

            if (userRole !== "Admin" && lesson.mentor_id !== currentUserId) {
                return {
                    status: 403,
                    message: "Siz faqat o'zingizning darsingizga tegishli uyga vazifalarni ko'ra olasiz!",
                    data: []
                };
            }

            let homeworks = await pool.query(
                `SELECT * FROM homework WHERE lesson_id = $1 ORDER BY id DESC`,
                [lesson_id]
            );

            return {
                status: 200,
                message: "Darsga tegishli uyga vazifalar muvaffaqiyatli olindi",
                data: homeworks.rows
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

export default new HomeworkService();
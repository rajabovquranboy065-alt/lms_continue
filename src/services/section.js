import pool from "../config/db.js"; 

class SectionService {
    async createSection(req) {
        try {
            let { course_id, title } = req.body; 
            let currentUserId =req.user.id; 
            let courseCheck = await pool.query(
                `SELECT * FROM courses WHERE id = $1`, 
                [course_id]
            );

            if (!courseCheck.rows.length) {
                return {
                    status: 404,
                    message: "Kurs topilmadi!"
                };
            }
            let course = courseCheck.rows[0];
            if (course.mentor_id !== currentUserId && req.user.role!="Admin") {
                return {
                    status: 403,
                    message: "Siz bu kursga bo'lim qo'shish huquqiga ega emassiz!"
                };
            }

            let newSection = await pool.query(
                `INSERT INTO sections (course_id, title) VALUES ($1, $2) RETURNING *`, 
                [course_id, title]
            );
            return {
                status: 201,
                message: "Bo'lim muvaffaqiyatli qo'shildi!",
                data: newSection.rows[0]
            };
        } 
        catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }

    async getAllSections() {
        try {
            let sections = await pool.query(`SELECT * FROM sections`);
            return {
                status: 200,
                data: sections.rows
            };
        } catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }

    async deleteSection(req) {
        try {
            let { id } = req.params;
            let currentUserId = req.user.id

            let sectionCheck = await pool.query(`SELECT * FROM sections WHERE id = $1`, [id]);
            if (!sectionCheck.rows.length) {
                return {
                    status: 404,
                    message: "Bo'lim topilmadi!"
                };
            }

            let section = sectionCheck.rows[0];
            let courseCheck = await pool.query(`SELECT * FROM courses WHERE id = $1`, [section.course_id]);
            let course = courseCheck.rows[0];

            if (course.mentor_id !== currentUserId) {
                return {
                    status: 403,
                    message: "Siz bu bo'limni o'chirish huquqiga ega emassiz!"
                };
            }

            await pool.query(`DELETE FROM sections WHERE id = $1`, [id]);

            return {
                status: 200,
                message: "Bo'lim muvaffaqiyatli o'chirildi!"
            };
        } catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }
    
    async updateSection(req) {
        try {
            let { id } = req.params;
            let { course_id, title } = req.body; 
            let currentUserId = req.user_id || req.user?.id;
            let userRole = req.role || req.user?.role;

            let sectionCheck = await pool.query(`SELECT * FROM sections WHERE id = $1`, [id]);
            if (!sectionCheck.rows.length) {
                return {
                    status: 404,
                    message: "Bo'lim topilmadi!"
                };
            }

            let courseCheck = await pool.query(`SELECT * FROM courses WHERE id = $1`, [course_id]);
            if (!courseCheck.rows.length) {
                return {
                    status: 404,
                    message: "Kurs topilmadi!"
                };
            }

            let course = courseCheck.rows[0];

            if (userRole !== 'admin' && course.mentor_id !== currentUserId) {
                return {
                    status: 403,
                    message: "Siz bu bo'limni tahrirlash huquqiga ega emassiz!"
                };
            }

            let updatedSection = await pool.query(
                `UPDATE sections SET course_id = $1, title = $2 WHERE id = $3 RETURNING *`,
                [course_id, title, id]
            );

            return {
                status: 200,
                message: "Bo'lim muvaffaqiyatli tahrirlandi!",
                data: updatedSection.rows[0]
            };
        } catch (error) {
            return {
                status: 500,
                message: error.message
            };
        }
    }

    async getSection(courseId) {
        try {
            let courseCheck = await pool.query(`SELECT * FROM courses WHERE id = $1`, [courseId]);
            
            if (!courseCheck.rows.length) {
                return {
                    status: 404,
                    message: "Bunday kurs topilmadi!",
                    data: []
                };
            }

            let sections = await pool.query(
                `
                SELECT s.* ,c.title as course_name , c.price,c.banner ,m.image as teacher_image,m.fullname as teacher_name FROM sections s 
                LEFT JOIN courses c on s.course_id=c.id
                LEFT JOIN mentors m on m.id=c.mentor_id
                 WHERE s.course_id = $1
                `, 
                [courseId]
            );

            return {
                status: 200,
                message: "Kurs bo'limlari olindi",
                data: sections.rows
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

export default new SectionService();
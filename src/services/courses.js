import pool from "../config/db.js";
import path from "path";
import fs from "fs";

class CourseService {
    
    async getAllCourses() {
        try {
            let courses = await pool.query(`
                SELECT 
                    c.id, 
                    c.title, 
                    c.banner, 
                    c.level, 
                    c.price, 
                    c.status,
                    cat.name AS category_name,
                    c.created_at,
                    m.image as mentor_image,
                    m.fullname as mentor_name
                FROM courses c
                LEFT JOIN categories cat ON c.category_id = cat.id
                LEFT JOIN mentors m on c.mentor_id=m.id
                ORDER BY c.id asc
            `);
            return { status: 200, data: courses.rows };
        } catch (error) {
            return { status: 500, message: error.message };
        }
    }

   
    async getOneCourse(id) {
        try {
            let course = await pool.query(`
                SELECT 
                    c.*,
                    cat.title AS category_name,
                    m.fullname AS mentor_name,
                    a.fullname AS assistant_name,
                    a.phone AS assistant_phone
                FROM courses c
                LEFT JOIN categories cat ON c.category_id = cat.id
                LEFT JOIN mentors m ON c.mentor_id = m.id
                LEFT JOIN assistants a ON c.assistant_id = a.id
                WHERE c.id = $1
            `, [id]);

            if (!course.rows.length) {
                return { status: 404, message: "Kurs topilmadi" };
            }

            return { status: 200, data: course.rows[0] };
        } catch (error) {
            return { status: 500, message: error.message };
        }
    }

    
    async getCourseStudents(courseId) {
        try {
            let students = await pool.query(`
                SELECT 
                    s.id, 
                    s.fullname, 
                    s.phone, 
                    p.amount AS payment_amount, 
                    p.payment_type, 
                    p.created_at AS enrolled_at
                FROM payments p
                JOIN students s ON p.student_id = s.id
                WHERE p.course_id = $1
                ORDER BY p.id DESC
            `, [courseId]);

            return { status: 200, data: students.rows };
        } catch (error) {
            return { status: 500, message: error.message };
        }
    }

    
    async createCourse(req) {
        try {
            let { title, description, level, price, category_id, mentor_id, assistant_id } = req.body;

            let intro_video_name = null;
            let banner_name = null;

            
            if (req.files && req.files.intro_video) {
                let videoFile = req.files.intro_video;
                let ext = path.extname(videoFile.name);
                intro_video_name = `intro_${Date.now()}${ext}`;
                let uploadPath = path.join(process.cwd(), "src", "utils", "uploads_introVideo", intro_video_name);

                await new Promise((resolve, reject) => {
                    videoFile.mv(uploadPath, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }

            
            if (req.files && req.files.banner) {
                let bannerFile = req.files.banner;
                let ext = path.extname(bannerFile.name);
                banner_name = `banner_${Date.now()}${ext}`;
                let uploadPath = path.join(process.cwd(), "src", "utils", "uploads_introVideo", banner_name);

                await new Promise((resolve, reject) => {
                    bannerFile.mv(uploadPath, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }

            
            let newCourse = await pool.query(
                `INSERT INTO courses (title, description, banner, intro_video, level, price, category_id, mentor_id, assistant_id)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
                [title, description, banner_name, intro_video_name, level || 'Beginner', price, category_id, mentor_id || null, assistant_id || null]
            );

            return { status: 201, message: "Kurs muvaffaqiyatli qo'shildi!", data: newCourse.rows[0] };
        } catch (error) {
            return { status: 500, message: error.message };
        }
    }

    
    async updateCourse(id, req) {
        try {
            let { title, description, level, price, category_id, mentor_id, assistant_id, status } = req.body;

            let checkCourse = await pool.query(`SELECT * FROM courses WHERE id = $1`, [id]);
            if (!checkCourse.rows.length) {
                return { status: 404, message: "Kurs topilmadi" };
            }

            let currentCourse = checkCourse.rows[0];
            let intro_video_name = currentCourse.intro_video;
            let banner_name = currentCourse.banner;

            if (req.files && req.files.intro_video) {
                let videoFile = req.files.intro_video;
                let ext = path.extname(videoFile.name);
                intro_video_name = `intro_${Date.now()}${ext}`;
                let uploadPath = path.join(process.cwd(), "src", "utils", "uploads_introVideo", intro_video_name);

                await new Promise((resolve, reject) => {
                    videoFile.mv(uploadPath, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }

            if (req.files && req.files.banner) {
                let bannerFile = req.files.banner;
                let ext = path.extname(bannerFile.name);
                banner_name = `banner_${Date.now()}${ext}`;
                let uploadPath = path.join(process.cwd(), "src", "utils", "uploads_introVideo", banner_name);

                await new Promise((resolve, reject) => {
                    bannerFile.mv(uploadPath, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }

            await pool.query(
                `UPDATE courses 
                 SET title = COALESCE($1, title),
                     description = COALESCE($2, description),
                     banner = COALESCE($3, banner),
                     intro_video = COALESCE($4, intro_video),
                     level = COALESCE($5, level),
                     price = COALESCE($6, price),
                     category_id = COALESCE($7, category_id),
                     mentor_id = COALESCE($8, mentor_id),
                     assistant_id = COALESCE($9, assistant_id),
                     status = COALESCE($10, status)
                 WHERE id = $11`,
                [
                    title ?? null, 
                    description ?? null, 
                    banner_name, 
                    intro_video_name, 
                    level ?? null, 
                    price ?? null, 
                    category_id ?? null, 
                    mentor_id ?? null, 
                    assistant_id ?? null,
                    status ?? null, 
                    id
                ]
            );

            return { status: 200, message: "Kurs muvaffaqiyatli tahrirlandi!" };
        } catch (error) {
            return { status: 500, message: error.message };
        }
    }

    async deleteCourse(id) {
        try {
            let checkCourse = await pool.query(`SELECT * FROM courses WHERE id = $1`, [id]);
            if (!checkCourse.rows.length) {
                return { status: 404, message: "Kurs topilmadi" };
            }

            await pool.query(`DELETE FROM courses WHERE id = $1`, [id]);
            return { status: 200, message: "Kurs o'chirildi!" };
        } catch (error) {
            return { status: 500, message: error.message };
        }
    }
    async assignAssistant(req){
        try {
        
        let {courseId,assistantId}=req.params
        let course=await pool.query(`select * from courses where id=$1`,[courseId])
        if(!course.rows.length){
            return {
                status:400,
                message:"course not found"
            }
        }
        let asist=await pool.query(`select * from assistants where id=$1`,[assistantId])
        if(!asist.rows.length){
            return {
                status:400,
                message:"course not found"
            }
        }
        await pool.query(`update courses set assistant_id=$1 where id=$2`,[assistantId,courseId])
        
        return{
            status:200,
            message:"assistants added"
        }
            
    } 
        catch (error) {
            return { status:500, message:error.message }
        }
}
    async getCoursesByCategory(categoryId) {
        try {
            let categoryCheck = await pool.query(`SELECT * FROM categories WHERE id = $1`, [categoryId]);
            if (!categoryCheck.rows.length) {
                return { 
                    status: 404, 
                    message: "Bunday kategoriya topilmadi!" 
                };
            }

            let courses = await pool.query(`
                SELECT 
                    c.id, 
                    c.title, 
                    c.banner, 
                    c.level, 
                    c.price, 
                    c.status,
                    cat.name AS category_name,
                    c.created_at,
                    m.image AS mentor_image,
                    m.fullname AS mentor_name
                FROM courses c
                LEFT JOIN categories cat ON c.category_id = cat.id
                LEFT JOIN mentors m ON c.mentor_id = m.id
                WHERE c.category_id = $1
                ORDER BY c.id DESC
            `, [categoryId]);

            return { 
                status: 200, 
                message: "Kategoriya bo'yicha kurslar", 
                data: courses.rows 
            };
        } catch (error) {
            return { status: 500, message: error.message };
        }
    }
}


export default new CourseService();
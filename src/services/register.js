import { hash } from "argon2";
import pool from "../config/db.js";

class RegisterService {
    async register(req) {
        try {
            let { fullname, phone, password } = req.body;

            
            let checkPhone = await pool.query(`
                SELECT fullname FROM staff WHERE phone = $1
                UNION 
                SELECT fullname FROM mentors WHERE phone = $1
                UNION 
                SELECT fullname FROM assistants WHERE phone = $1
                UNION 
                SELECT fullname FROM students WHERE phone = $1
            `, [phone]);

            if (checkPhone.rows.length) {
                return {
                    status: 409,
                    message: "Bu telefon raqami allaqachon ro'yxatdan o'tgan!"
                };
            }

            let hashedPassword = await hash(password);

            let newUser = await pool.query(
                `INSERT INTO students (fullname, phone, password) VALUES ($1, $2, $3) RETURNING id, fullname, phone`,
                [fullname, phone, hashedPassword]
            );

            return {
                status: 201,
                message: "Muvaffaqiyatli ro'yxatdan o'tdingiz!",
                data: newUser.rows[0]
            };

        } catch (error) {
            throw error;
        }
    }
}

export default new RegisterService();
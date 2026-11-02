import pool from "../config/db.js"

class PaymentService {
    async getAllPayments() {
        try {
            let payments = await pool.query(`
                SELECT p.id, s.fullname AS buyer_name, c.name AS course_name, 
                       cat.name AS category_name, p.amount, p.payment_type, 
                       p.status, p.created_at
                FROM payments p
                LEFT JOIN students s ON p.student_id = s.id
                LEFT JOIN courses c ON p.course_id = c.id
                LEFT JOIN categories cat ON c.category_id = cat.id
                ORDER BY p.id DESC
            `)
            return { status: 200, data: payments.rows }
        } catch (error) {
            return { status: 500, message: error.message }
        }
    }

    async getOnePayment(id) {
        try {
            let payment = await pool.query(`
                SELECT p.id, s.fullname AS buyer_name, c.name AS course_name, 
                       cat.name AS category_name, p.amount, p.payment_type, 
                       p.status, p.created_at
                FROM payments p
                LEFT JOIN students s ON p.student_id = s.id
                LEFT JOIN courses c ON p.course_id = c.id
                LEFT JOIN categories cat ON c.category_id = cat.id
                WHERE p.id = $1
            `, [id])

            if (!payment.rows.length) {
                return { status: 404, message: "To'lov topilmadi" }
            }
            return { status: 200, data: payment.rows[0] }
        } catch (error) {
            return { status: 500, message: error.message }
        }
    }

    async createPayment(req) {
        try {
            let { student_id, course_id, amount, payment_type, status } = req.body

            await pool.query(
                `INSERT INTO payments (student_id, course_id, amount, payment_type, status) 
                 VALUES ($1, $2, $3, $4, $5)`,
                [student_id, course_id, amount, payment_type, status || 'To`landi']
            )

            return { status: 201, message: "To'lov muvaffaqiyatli qo'shildi!" }
        } catch (error) {
            return { status: 500, message: error.message }
        }
    }

    async updatePayment(id, req) {
        try {
            let { student_id, course_id, amount, payment_type, status } = req.body

            let checkPayment = await pool.query(`SELECT * FROM payments WHERE id = $1`, [id])
            if (!checkPayment.rows.length) {
                return { status: 404, message: "To'lov topilmadi" }
            }

            
            let safeStudentId = student_id ?? null
            let safeCourseId = course_id ?? null
            let safeAmount = amount ?? null
            let safePaymentType = payment_type ?? null
            let safeStatus = status ?? null

            await pool.query(
                `UPDATE payments 
                 SET student_id = COALESCE($1, student_id),
                     course_id = COALESCE($2, course_id),
                     amount = COALESCE($3, amount),
                     payment_type = COALESCE($4, payment_type),
                     status = COALESCE($5, status)
                 WHERE id = $6`,
                [safeStudentId, safeCourseId, safeAmount, safePaymentType, safeStatus, id]
            )

            return { status: 200, message: "To'lov muvaffaqiyatli tahrirlandi!" }
        } catch (error) {
            return { status: 500, message: error.message }
        }
    }

    async deletePayment(id) {
        try {
            let checkPayment = await pool.query(`SELECT * FROM payments WHERE id = $1`, [id])
            if (!checkPayment.rows.length) {
                return { status: 404, message: "To'lov topilmadi" }
            }

            await pool.query(`DELETE FROM payments WHERE id = $1`, [id])
            return { status: 200, message: "To'lov o'chirildi!" }
        } catch (error) {
            return { status: 500, message: error.message }
        }
    }
}

export default new PaymentService()
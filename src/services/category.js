import pool from "../config/db.js";

class CategoryService {
    async getAllCategories() {
        let categories = await pool.query(`SELECT * FROM categories`);
        return {
            status: 200,
            message: "Barcha kurs kategoriyalari",
            data: categories.rows
        };
    }

    async createCategory(req) {
        let { name } = req.body;

        let newCategory = await pool.query(
            `INSERT INTO categories (name) VALUES ($1) RETURNING *`,
            [name]
        );

        return {
            status: 201,
            message: "Kategoriya muvaffaqiyatli qo'shildi",
            data: newCategory.rows[0]
        };
    }

    async updateCategory(req) {
        let { id } = req.params;
        let { name } = req.body;

        let check = await pool.query(`SELECT * FROM categories WHERE id = $1`, [id]);
        if (!check.rows.length) {
            return {
                status: 404,
                message: "Kategoriya topilmadi"
            };
        }

        let updated = await pool.query(
            `UPDATE categories SET name = $1 WHERE id = $2 RETURNING *`,
            [name, id]
        );

        return {
            status: 200,
            message: "Kategoriya muvaffaqiyatli tahrirlandi",
            data: updated.rows[0]
        };
    }

    async deleteCategory(req) {
        let { id } = req.params;

        let check = await pool.query(`SELECT * FROM categories WHERE id = $1`, [id]);
        if (!check.rows.length) {
            return {
                status: 404,
                message: "Kategoriya topilmadi"
            };
        }

        await pool.query(`update categories set status='inactive' where id=$1`, [id]);

        return {
            status: 200,
            message: "Kategoriya muvaffaqiyatli o'chirildi"
        };
    }
}

export default new CategoryService();
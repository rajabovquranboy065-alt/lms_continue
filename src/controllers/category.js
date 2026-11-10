import categoryService from "../services/category.js";

class CategoryController {
    async getAll(req, res, next) {
        try {
            let result = await categoryService.getAllCategories();
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            let result = await categoryService.createCategory(req);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            let result = await categoryService.updateCategory(req);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            let result = await categoryService.deleteCategory(req);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new CategoryController();
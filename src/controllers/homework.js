import homeworkService from "../services/homework.js";

class HomeworkController {
    async getAll(req, res, next) {
        try {
            let result = await homeworkService.getAllHomeworks();
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            let result = await homeworkService.createHomework(req);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            let result = await homeworkService.deleteHomework(req);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new HomeworkController();
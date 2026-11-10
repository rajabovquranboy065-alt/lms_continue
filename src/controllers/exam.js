import examService from "../services/exam.js";

class ExamController {
    async getAll(req, res, next) {
        try {
            let result = await examService.getAllExams();
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            let result = await examService.createExam(req);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            let result = await examService.updateExam(req);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            let result = await examService.deleteExam(req);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new ExamController();
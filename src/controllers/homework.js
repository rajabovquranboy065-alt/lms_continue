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
    async getHomeworksByLesson(req, res) {
        try {
            let { lesson_id } = req.params;
            let result = await homeworkService.getHomeworksByLessonId(lesson_id, req.user);
            
            return res.status(result.status).json({
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new HomeworkController();
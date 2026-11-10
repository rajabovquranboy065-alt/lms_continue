import lessonService from "../services/lesson.js";

class LessonController {
    async getAll(req, res, next) {
        try {
            let result = await lessonService.getAllLessons();
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            let result = await lessonService.createLesson(req);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            let result = await lessonService.updateLesson(req);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            let result = await lessonService.deleteLesson(req);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }
    async getBySectionId(req, res) {
        try {
            const { sectionId } = req.params;
            const result = await lessonService.getBySectionId(sectionId);
            
            return res.status(result.status).json({
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new LessonController();
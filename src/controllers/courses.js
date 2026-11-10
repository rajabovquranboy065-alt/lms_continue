import courseService from "../services/courses.js"

class CourseController {
    async getCourses(req, res, next) {
        try {
            let result = await courseService.getAllCourses()
            return res.status(result.status).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async getCourseById(req, res, next) {
        try {
            let result = await courseService.getOneCourse(req.params.id)
            return res.status(result.status).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async getCourseStudents(req, res, next) {
        try {
            let result = await courseService.getCourseStudents(req.params.id)
            return res.status(result.status).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async addCourse(req, res, next) {
        console.log(req.body,req.files)
        try {
            let result = await courseService.createCourse(req)
            return res.status(result.status).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async assignAssistant(req, res, next) {
        try {
            let result = await courseService.assignAssistant(req)
            return res.status(result.status).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async updateCourse(req, res, next) {
        try {
            let result = await courseService.updateCourse(req.params.id, req)
            return res.status(result.status).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async deleteCourse(req, res, next) {
        try {
            let result = await courseService.deleteCourse(req.params.id)
            return res.status(result.status).json(result)
        } catch (error) {
            return next(error)
        }
    }
    async getCoursesByCategory(req, res, next) {
        try {
            let { categoryId } = req.params;
            let result = await courseService.getCoursesByCategory(categoryId);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new CourseController()
import myCourseService from "../services/myCourse.js"

class MyCourseController {
    async getMyCourses(req, res) {
        try {
            let result = await myCourseService.getMyCourses(req);
            return res.status(result.status).json({
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new MyCourseController();
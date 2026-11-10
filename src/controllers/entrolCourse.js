import enrollService from "../services/entrolCourse.js"

class EnrollController {
    async enroll(req, res) {
        let result = await enrollService.enrollCourse(req);
        return res.status(result.status).json({ 
            message: result.message, 
            data: result.data || null 
        });
    }
}

export default new EnrollController();
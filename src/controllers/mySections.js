import mySectionService from "../services/mySections.js";

class MySectionController {
    async getCourseContent(req, res) {
        try {
            let result = await mySectionService.getCourseContentForStudent(req);
            return res.status(result.status).json({
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new MySectionController();
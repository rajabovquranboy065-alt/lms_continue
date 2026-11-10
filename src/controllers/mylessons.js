import sectionDetailService from "../services/mylessons.js"

class SectionDetailController {
    async getLessonsBySection(req, res) {
        try {
            let result = await sectionDetailService.getSectionLessonsWithHomework(req);
            return res.status(result.status).json({
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new SectionDetailController();
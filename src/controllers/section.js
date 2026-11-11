import sectionService from "../services/section.js";

class SectionController {
    constructor(){}
    
    async create(req, res, next) {
        try {
            let result = await sectionService.createSection(req);
            return res.status(result.status).json({
                status: result.status,
                message: result.message,
                data: result.data || null
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        console.log("salomm")
        try {
            let result = await sectionService.getAllSections();
            return res.status(result.status).json({
                status: result.status,
                data: result.data
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            let result = await sectionService.deleteSection(req);
            return res.status(result.status).json({
                status: result.status,
                message: result.message
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            let result = await sectionService.updateSection(req);
            return res.status(result.status).json({
                status: result.status,
                message: result.message,
                data: result.data || null
            });
        } catch (error) {
            next(error);
        }
    }
    async getSectionByCourseId(req, res) {
        try {
            let { courseId } = req.params;
            let result = await sectionService.getSection(courseId, req.user);
            
            return res.status(result.status).json({
                message: result.message,
                data: result.data
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new SectionController();
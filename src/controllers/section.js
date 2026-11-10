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
    async getByCourseId(req, res, next) {
    try {
        let { courseId } = req.params;
        let resData = await sectionService.getSection(courseId);
        
        return res.status(resData.status).json({
            status: resData.status,
            message: resData.message,
            data: resData.data
        });
        
    } catch (error) {
        next(error);
    }
}
}

export default new SectionController();
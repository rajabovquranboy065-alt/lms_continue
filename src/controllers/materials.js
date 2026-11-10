import materialService from "../services/material.js";

class MaterialController {
    async getAll(req, res, next) {
        try {
            let result = await materialService.getAllMaterials();
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            let result = await materialService.createMaterial(req);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            let result = await materialService.deleteMaterial(req);
            return res.status(result.status).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new MaterialController();
import services from "../services/register.js";

class RegisterController {
    async register(req, res, next) {
        try {
            let resData = await services.register(req);
            return res.status(resData.status).json({
                status: resData.status,
                message: resData.message,
                data: resData.data || null
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new RegisterController();
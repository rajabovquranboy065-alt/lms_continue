import paymentService from "../services/payments.js"

class PaymentController {
    async getPayments(req, res, next) {
        try {
            let result = await paymentService.getAllPayments()
            return res.status(result.status).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async getPaymentById(req, res, next) {
        try {
            let result = await paymentService.getOnePayment(req.params.id)
            return res.status(result.status).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async addPayment(req, res, next) {
        try {
            let result = await paymentService.createPayment(req)
            return res.status(result.status).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async updatePayment(req, res, next) {
        try {
            let result = await paymentService.updatePayment(req.params.id, req)
            return res.status(result.status).json(result)
        } catch (error) {
            return next(error)
        }
    }

    async deletePayment(req, res, next) {
        try {
            let result = await paymentService.deletePayment(req.params.id)
            return res.status(result.status).json(result)
        } catch (error) {
            return next(error)
        }
    }
}

export default new PaymentController()
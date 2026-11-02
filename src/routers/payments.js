import { Router } from "express"
import paymentController from "../controllers/payments.js"
import { verifyToken } from "../middleware/auth.js"
import { isAdmin } from "../middleware/isAdmin.js"

const paymentRouter = Router()

paymentRouter
    .get("/payments", verifyToken, isAdmin, paymentController.getPayments)
    .get("/payments/:id", verifyToken, isAdmin, paymentController.getPaymentById)
    .post("/payments", verifyToken, isAdmin, paymentController.addPayment)
    .put("/payments/:id", verifyToken, isAdmin, paymentController.updatePayment)
    .delete("/payments/:id", verifyToken, isAdmin, paymentController.deletePayment)

export default paymentRouter
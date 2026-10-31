import { Router } from "express";
import controllers from "../controllers/staff.js";
import { AdminMiddleware } from "../middleware/validation.js";
import { isAdmin } from "../middleware/isAdmin.js"; 
import { verifyToken } from "../middleware/auth.js";
let staffrouter=Router()

staffrouter
    .post("/admin",verifyToken,isAdmin,AdminMiddleware,controllers.createAdmin)
    .get("/get/admins",verifyToken,isAdmin,controllers.getAllAdmins)
    .delete("/delete/staff/:userId",verifyToken,isAdmin,controllers.deleteAdmin)

export default staffrouter
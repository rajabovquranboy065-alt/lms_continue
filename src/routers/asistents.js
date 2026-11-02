import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";
import controllers from "../controllers/asistents.js"
import { AsistMiddleware } from "../middleware/assistant.js";
let asistentRouter=Router()


asistentRouter
    .get("/get/assistants",verifyToken,isAdmin,controllers.getAsistents)
    .get("/assistants/:id",verifyToken,isAdmin,controllers.thi_asistant)
    .post("/add/assistant",verifyToken,isAdmin,AsistMiddleware,controllers.addAssistant)   
    .delete("/delete/assistant/:id",verifyToken,isAdmin,controllers.delete) 
    .put("/edit/assistant/:id",verifyToken,isAdmin,controllers.editInfo)
export default asistentRouter
import { Router } from "express";
import controllers from "../controllers/mentors.js"
import { MentorMiddleware } from "../middleware/validation.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { verifyToken } from "../middleware/auth.js";

let mentorsRouter=Router()

mentorsRouter
    .get("/get/mentors",verifyToken,isAdmin,controllers.getAllMentors)
    .post("/add/mentor",verifyToken,isAdmin,MentorMiddleware,controllers.addMentor)
    .delete("/delete/mentor/:id",verifyToken,isAdmin,controllers.deleteMentor)
    .get("/get/mentor/:mentorId",verifyToken,isAdmin,controllers.getTHIS_Mentor)
    .put("/edit/mentor/:mentorId",verifyToken,isAdmin,MentorMiddleware,controllers.editMentor)


export default mentorsRouter
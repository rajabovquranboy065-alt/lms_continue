import { Router } from "express";
import myMentorCoursesController from "../controllers/mentorMycourse.js"
import {verifyToken} from "../middleware/auth.js"

const MyMentorrouter = Router();


MyMentorrouter.get("/mycourses/mentor", verifyToken, myMentorCoursesController.getMyCourses);

export default MyMentorrouter;
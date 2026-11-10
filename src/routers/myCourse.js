import { Router } from "express";
import myCourseController from "../controllers/myCourse.js"
import {verifyToken} from "../middleware/auth.js" 

const MyCourserouter = Router();


MyCourserouter.get("/myCourses", verifyToken, myCourseController.getMyCourses);

export default MyCourserouter;
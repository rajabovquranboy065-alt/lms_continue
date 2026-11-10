import { Router } from "express";
import mySectionController from '../controllers/mySections.js'
import {verifyToken} from "../middleware/auth.js"

const Mysectionrouter = Router();
Mysectionrouter.get("/mysections/:courseId/", verifyToken, mySectionController.getCourseContent);

export default Mysectionrouter;
import { Router } from "express";
import sectionDetailController from "../controllers/mylessons.js"
import {verifyToken} from "../middleware/auth.js"

const mylessonrouter = Router();


mylessonrouter.get("/sections/:sectionId/lessons", verifyToken, sectionDetailController.getLessonsBySection);

export default mylessonrouter;
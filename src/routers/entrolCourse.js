import { Router } from "express";
import enrollController from "../controllers/entrolCourse.js"
import {verifyToken} from "../middleware/auth.js"

const entrolrouter = Router();

entrolrouter.post("/enroll", verifyToken, enrollController.enroll);

export default entrolrouter;
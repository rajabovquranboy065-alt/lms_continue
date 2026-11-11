import { Router } from "express";
import homeworkController from "../controllers/homework.js";
import { verifyToken } from "../middleware/auth.js";

const Homeworkrouter = Router();

Homeworkrouter
    .get("/homeworks", homeworkController.getAll)
    .post("/homeworks",verifyToken,homeworkController.create)
    .delete("/homeworks/:id", homeworkController.delete)
    .get("/:lesson_id/homeworks", verifyToken, homeworkController.getHomeworksByLesson);

export default Homeworkrouter;
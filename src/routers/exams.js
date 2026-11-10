import { Router } from "express";
import examController from "../controllers/exam.js";

const examrouter = Router();

examrouter.get("/exams", examController.getAll);
examrouter.post("/exams", examController.create);
examrouter.put("/exams/:id", examController.update);
examrouter.delete("/exams/:id", examController.delete);

export default examrouter;
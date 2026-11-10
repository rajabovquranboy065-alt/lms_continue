import { Router } from "express";
import homeworkController from "../controllers/homework.js";

const Homeworkrouter = Router();

Homeworkrouter
    .get("/homeworks", homeworkController.getAll)
    .post("/homeworks", homeworkController.create)
    .delete("/homeworks/:id", homeworkController.delete)

export default Homeworkrouter;
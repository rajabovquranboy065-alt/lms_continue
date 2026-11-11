import { Router } from "express";
import lessonController from "../controllers/lesson.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.get("/lessons", lessonController.getAll);
router.post("/lessons",verifyToken,lessonController.create);
router.put("/lessons/:id", lessonController.update);
router.delete("/lessons/:id", lessonController.delete);
router.get("/lessons/section/:sectionId", lessonController.getBySectionId);

export default router;
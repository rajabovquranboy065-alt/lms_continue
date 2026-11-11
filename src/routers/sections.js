import { Router } from "express";
import sectionController from "../controllers/section.js";
import { verifyToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

router.get("/sections", sectionController.getAll);
router.post("/sections",verifyToken,sectionController.create);
router.delete("/sections/:id",verifyToken,sectionController.delete);
router.put("/sections/:id",verifyToken, sectionController.update);
router.get("/sections/course/:courseId", verifyToken,sectionController.getSectionByCourseId);


export default router;
import { Router } from "express"
import courseController from "../controllers/courses.js"
import { verifyToken } from "../middleware/auth.js"
import { isAdmin } from "../middleware/isAdmin.js"

const courseRouter = Router()

courseRouter
    .get("/courses", courseController.getCourses)
    .get("/courses/:id", verifyToken, isAdmin, courseController.getCourseById)
    .get("/courses/:id/students", verifyToken, isAdmin, courseController.getCourseStudents)
    .post("/courses", verifyToken, courseController.addCourse)
    .put("/courses/:courseId/assistant/:assistantId",verifyToken,isAdmin,courseController.assignAssistant)
    .put("/courses/:id", verifyToken, isAdmin, courseController.updateCourse)
    .delete("/courses/:id", verifyToken, isAdmin, courseController.deleteCourse)
    .get("/courses/category/:categoryId", courseController.getCoursesByCategory)

export default courseRouter
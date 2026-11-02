import { Router } from "express"
import studentController from "../controllers/students.js"
import { verifyToken } from "../middleware/auth.js"
import { isAdmin } from "../middleware/isAdmin.js"

const studentRouter = Router()
studentRouter
    .get("/students", verifyToken, isAdmin, studentController.getStudents)
    .get("/students/:id",verifyToken, isAdmin, studentController.getStudentById)
    .post("/students", verifyToken, isAdmin, studentController.addStudent)
    .put("/students/:id", verifyToken, isAdmin, studentController.updateStudent)
    .delete("/students/:id",verifyToken, isAdmin,  studentController.deleteStudent)

export default studentRouter
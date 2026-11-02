import studentService from "../services/students.js"

class StudentController {
    async getStudents(req, res) {
        let result = await studentService.getAllStudents()
        return res.status(result.status).json(result)
    }

    async getStudentById(req, res) {
        let result = await studentService.getOneStudent(req.params.id)
        return res.status(result.status).json(result)
    }

    async addStudent(req, res) {
        let result = await studentService.createStudent(req)
        return res.status(result.status).json(result)
    }

    async updateStudent(req, res) {
        let result = await studentService.updateStudent(req.params.id, req)
        return res.status(result.status).json(result)
    }

    async deleteStudent(req, res) {
        let result = await studentService.deleteStudent(req.params.id)
        return res.status(result.status).json(result)
    }
}

const studentController = new StudentController()
export default studentController
import staffrouter from "./staff.js";
import mentorsRouter from "../routers/mentors.js";
import asistentRouter from "./asistents.js";
import Loginrouter from "./login.js";
import studentRouter from "./students.js";
import paymentRouter from "./payments.js";
import courseRouter from "./courses.js";
import router from "./sections.js";
import routerlessson from "./lessons.js";
import categoriesrouter from "./categories.js";
import Materialsrouter from "./materials.js";
import Homeworkrouter from "./homeworks.js";
import examrouter from "./exams.js"
import registerRouter from "./register.js";
import entrolrouter from "./entrolCourse.js";
import MyCourserouter from "./myCourse.js";
import Mysectionrouter from "./mySections.js";
import mylessonrouter from "./mylessons.js"
import { Router } from "express";


let main =Router()

main
    .use(staffrouter)
    .use(mentorsRouter)
    .use(asistentRouter)
    .use(Loginrouter)
    .use(studentRouter)
    .use(paymentRouter)
    .use(courseRouter)
    .use(router)
    .use(routerlessson)
    .use(categoriesrouter)
    .use(Materialsrouter)
    .use(Homeworkrouter)
    .use(examrouter)
    .use(registerRouter)
    .use(entrolrouter)
    .use(MyCourserouter)
    .use(Mysectionrouter)
    .use(mylessonrouter)



export default main
import staffrouter from "./staff.js";
import mentorsRouter from "../routers/mentors.js";
import asistentRouter from "./asistents.js";
import Loginrouter from "./login.js";
import studentRouter from "./students.js";
import paymentRouter from "./payments.js";
import { Router } from "express";

let main =Router()

main
    .use(staffrouter)
    .use(mentorsRouter)
    .use(asistentRouter)
    .use(Loginrouter)
    .use(studentRouter)
    .use(paymentRouter)


export default main
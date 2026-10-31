import staffrouter from "./staff.js";
import mentorsRouter from "../routers/mentors.js";
import asistentRouter from "./asistents.js";
import Loginrouter from "./login.js";
import { Router } from "express";

let main =Router()

main.use(staffrouter)
main.use(mentorsRouter)
main.use(asistentRouter)
main.use(Loginrouter)


export default main
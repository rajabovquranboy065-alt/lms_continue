import { Router } from "express";
import controllers from "../controllers/login.js"
let Loginrouter=Router()


Loginrouter
    .post("/login",controllers.Loginn)


    export default Loginrouter
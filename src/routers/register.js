import { Router } from "express";
import controller from "../controllers/register.js";

let registerRouter=Router()


registerRouter
    .post("/register",controller.register)



 export default registerRouter   
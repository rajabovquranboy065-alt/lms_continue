import { Router } from "express";
import materialController from "../controllers/materials.js";
import {verifyToken} from "../middleware/auth.js"

const Materialsrouter = Router();

Materialsrouter.get("/materials", materialController.getAll);
Materialsrouter.post("/materials",verifyToken,materialController.create);
Materialsrouter.delete("/materials/:id", materialController.delete);

export default Materialsrouter;
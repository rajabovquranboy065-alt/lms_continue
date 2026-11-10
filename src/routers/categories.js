import { Router } from "express";
import categoryController from "../controllers/category.js";
import { verifyToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const categoriesrouter = Router();

categoriesrouter
    .get("/categories", categoryController.getAll)
    .post("/categories",verifyToken,isAdmin,categoryController.create)
    .put("/categories/:id", categoryController.update)
    .delete("/categories/:id", categoryController.delete)

export default categoriesrouter
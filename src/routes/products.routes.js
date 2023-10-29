import { Router } from "express";
import { authUser, authAdmin, authPremium } from "./session.routes.js";
import { ProductController } from "../controllers/products.controller.js";

const router = Router();
const productController = new ProductController();
router.get('/', authUser, productController.getAll)
router.get('/:pid', authUser, productController.getById)
router.post('/', authAdmin, productController.add)
router.put('/:pid', authAdmin, productController.update)
router.delete('/:pid', authAdmin, productController.delete)

export default router;
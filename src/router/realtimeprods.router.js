import { Router } from "express";
import { ProductManager } from "../dao/dbManagers/DBproductManager.js";
import { __dirname } from "../utils.js";

const realtimeRouter = Router();

const productManager = new ProductManager()

realtimeRouter.get("/", async (req, res) => {
  const products = await productManager.getProductsRealtime();
  res.render("realtimeproducts", { products });
});

export default realtimeRouter;

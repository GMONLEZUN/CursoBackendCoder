import { Router } from "express";
import { ProductManager } from "../classes/ProductManager.js";
import { __dirname } from "../utils.js";

const realtimeRouter = Router();

const productManager = new ProductManager('/productos.json')

realtimeRouter.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realtimeproducts", { products });
});

export default realtimeRouter;

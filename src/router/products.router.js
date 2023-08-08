import { Router } from "express";
import { ProductManager } from "../dao/dbManagers/DBproductManager.js"

const router = Router();

const productManager = new ProductManager()

router.get('/', async (req,res)=>{
    const { limit } = req.query;
    
    try {
      let response = await productManager.getProducts();
      
      if (limit) {
        let tempArray = response.filter((data, index) => index < limit);
        res.json({ data: tempArray, limit: limit, quantity: tempArray.length });
      } else {
        res.json({ data: response, limit: false, quantity: response.length });
    }
    } catch (err) {
        console.log(err);
        res.json({ data: err });
    }
})

router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
  
    let product = await productManager.getProductById(pid);
  
    if (product) {
      res.json({ message: "success", data: product });
    } else {
      res.json({
        message: "El producto solicitado no existe",
      });
    }
  });

router.post("/", async(req, res)=>{
    const {
        title,
        description,
        price,
        code,
        stock,
        thumbnail
    } = req.body;
    if (!title || !description || !code || !price || !stock) {
        res.json({ message: "Datos incompletos" });
      } else { 
        
        try {
            let productToAdd = {
                title,
                description,
                price,
                code,
                stock,
                thumbnail,
            }
            const response = await productManager.addProduct(productToAdd);
            res.json({
                message: "Producto agregado correctamente",
                data: response
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Error interno: ' + error,
            });
        }
    }
})

router.put('/:pid', async (req, res)=>{
    const {pid} = req.params;
    const {
        title,     
        description,
        price,
        code,
        stock,
        thumbnail
    } = req.body;

    let product = await productManager.getProductById(pid);
    let updatedFields = {}
    if (product) {
        updatedFields.title=title || product.title;
        updatedFields.description=description || product.description;
        updatedFields.price=price || product.price;
        updatedFields.code=code || product.code;
        updatedFields.stock=stock || product.stock;
        updatedFields.thumbnail=thumbnail || product.thumbnail;
        
        let result = await productManager.updateProductById(pid, updatedFields);
        res.json({message: "Producto modificado correctamente", new: updatedFields, old: product})
    } else {
        res.json({
            message: "No se ha encontrado el producto que desea modificar"
        })
    }
})

router.delete('/:pid', async(req,res)=>{
    const { pid } = req.params;
    let product = await productManager.getProductById(pid);
    if (product) {
        let result = await productManager.deleteProductById(pid);
        res.json({ message: "Producto eliminado correctamente", data: result });
    } else {
        res.json({
            message: "No se ha encontrado el producto que desea eliminar"
        })
    }
})

  export default router;
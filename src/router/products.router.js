import { Router } from "express";
import { ProductManager } from "../dao/dbManagers/DBproductManager.js"

const router = Router();

const productManager = new ProductManager()

router.get('/', async (req,res)=>{
    let  limitSet = req.query.limit;
    let  pageSet = req.query.page;
    let sortSet = req.query.sorted;
    let value = req.query.search
    
    if (!limitSet){
        limitSet = 10
    }
    if (!pageSet){
        pageSet = 1
    }
    
    
    try {

        const respuesta = await productManager.getProducts(limitSet, pageSet, sortSet, value);
        
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, limit, totalDocs, totalPages } = respuesta.response;
        const products = docs;
        
        let noSort = false;
        let mayorSort = false;
        let menorSort = false;
        let limit3 = false;
        let limit10 = false;

        limit==3 ? limit3 = true : limit10=true; 
        
        if (respuesta.sortProd == 0) {
            noSort = true;
        }
        if (respuesta.sortProd == -1) {
            mayorSort = true;
        }
        if (respuesta.sortProd == 1) {
            menorSort = true;
        }

        res.render( "products", {
            products,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            limit,
            limit3,
            limit10,
            totalDocs,
            totalPages,
            noSort, mayorSort, menorSort
          });
    }
     catch (err) {
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
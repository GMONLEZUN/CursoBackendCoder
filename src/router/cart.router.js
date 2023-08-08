import { Router } from "express";
import { ProductManager } from "../dao/dbManagers/DBproductManager.js"
import { CartManager } from "../dao/dbManagers/DBcartManager.js"

const router = Router();

const productManager = new ProductManager();
const cartManager = new CartManager();


router.post("/", async(req, res)=>{
    try {
        const response = await cartManager.addCart();
        res.json({
            message: "Carrito creado exitosamente",
            data: response
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error interno: ' + error,
        });
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const {cid} = req.params;
        const cart = await cartManager.getCartById(cid);
        res.json({
            data: cart
        })  
    } catch (error) {
        res.status(500).json({error: error})
    }
  
  });



router.post('/:cid/product/:pid', async (req, res)=>{
    try {
        const {cid, pid} = req.params;
        const {qty} = req.body
        const product = await productManager.getProductById(pid);
        const cart = await cartManager.getCartById(cid);
        cartManager.addProductToCart(cart[0], product[0], qty)
        res.json({
            message: "Producto agregado correctamente",
            producto: product,
            cart: cart
        })
    } catch (error) {
        res.status(500).json({error: error})
    }
    
})

router.delete('/:cid', async (req,res)=>{
    try{
        const {cid} = req.params;
        const response = await cartManager.deleteCartById(cid);
        res.json({
            message: "Carrito eliminado",
            cartID: cid,
            respuesta: response
        })
    } catch (error){
        res.status(500).json({error})
    }
})

export default router;
import express from 'express';
import productRouter from "./router/products.router.js"
import cartRouter from "./router/cart.router.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.get('/',(req,res)=>{
    res.send('Primera pre-entrega, curso backend');
})

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);


app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
})
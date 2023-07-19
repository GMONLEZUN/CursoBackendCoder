import express from 'express';
import { engine } from "express-handlebars";
import { Server } from 'socket.io';

import { __dirname } from './utils.js';

import productRouter from "./router/products.router.js";
import cartRouter from "./router/cart.router.js";
import realtimeRouter from './router/realtimeprods.router.js';

import { ProductManager } from "./classes/ProductManager.js";

const app = express();
const PORT = 8080;

// Configurar el middleware para manejar las solicitudes JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Configurar el directorio estático para archivos públicos
app.use(express.static(__dirname+"/public"));

// Configurar el motor de plantillas Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use("/", realtimeRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
});

const socketServer = new Server(httpServer);

socketServer.on("connection", socket => {
    console.log("Nuevo cliente conectado");
    const productManager = new ProductManager('/productos.json')
    socket.on("addProduct", async newProduct => {
        await productManager.addProduct(newProduct.title, newProduct.description, newProduct.price, newProduct.code, newProduct.stock, newProduct.thumbnail);
        // Agregar el nuevo producto a la lista de productos
        let products = await productManager.getProducts();
        console.log(products)
        socket.emit("updateList", products);
      });
    
    socket.on("deleteProduct", async idProd =>{
        await productManager.deleteProductById(idProd.id);
        let products = await productManager.getProducts();
        socket.emit("updateList", products);
    })
    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});

import express from 'express';
import { engine } from "express-handlebars";
import { Server } from 'socket.io';

import { __dirname } from './utils.js';

import productRouter from "./router/products.router.js";
import cartRouter from "./router/cart.router.js";
import realtimeRouter from './router/realtimeprods.router.js';
import chatRouter from './router/chat.router.js';

import { ProductManager } from "./dao/dbManagers/DBproductManager.js";

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { MessageManager } from './dao/dbManagers/DBmessageManager.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI);

const productManager = new ProductManager()
const messageManager = new MessageManager()

// Configurar el middleware para manejar las solicitudes JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Configurar el directorio estático para archivos públicos
app.use(express.static(__dirname+"/public"));

// Configurar el motor de plantillas Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);



app.get("/", async (req, res) => {
    let products = await productManager.getProducts();
    res.render("home", {products});
})

app.use("/realtimeproducts", realtimeRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/chat", chatRouter);

const httpServer = app.listen(PORT, (e)=>{
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

const socketServer = new Server(httpServer);

let messages = await messageManager.getMessages() || [];

socketServer.on("connection", socket => {
    console.log("Nuevo cliente conectado");
    socket.on("addProduct", async newProduct => {
        await productManager.addProduct(newProduct);
        // Agregar el nuevo producto a la lista de productos
        let products = await productManager.getProductsRealtime();
        socket.emit("updateList", products);
    });
    socket.on("deleteProduct", async idProd =>{
        await productManager.deleteProductById(idProd.id);
        let products = await productManager.getProductsRealtime();
        socket.emit("updateList", products);
    })
    socket.on('newUserConnected', user=>{
        socket.broadcast.emit('newUserConnected', user)
    });
    
    socketServer.emit('messageLogs', messages);
    
    socket.on('message', async data =>{
        messages.push(data);
        await messageManager.addMessage(data.user, data.message)
        socketServer.emit('messageLogs', messages)
    });
    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});

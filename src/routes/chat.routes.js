import { Router } from "express";
import { MessageManager } from "../dao/dbManagers/DBmessageManager.js";
import { __dirname } from "../utils.js";

const chatRouter = Router();

const messageManager = new MessageManager()

chatRouter.get("/", async (req, res) => {

  const messages = await messageManager.getMessages();
  res.render("chat", { messages });
});

export default chatRouter;

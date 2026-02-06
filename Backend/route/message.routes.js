
import express from "express";
import { SendMessage, getMessages } from "../controllers/message.controllers.js";
import  isAuth  from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/send/:receiver",
  isAuth,
  upload.single("image"), 
  SendMessage
);

router.get("/get/:id", isAuth, getMessages);
export default router;

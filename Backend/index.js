import dotenv from "dotenv";
dotenv.config(); 

import connectDB from "./Config/db.js";
import express from "express"; 
import authRouter from "./route/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./route/user.routes.js";
import messageRouter from "./route/message.routes.js";
import { app, server } from "./socket/socket.js"; 

const port = process.env.PORT || 8000;
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

server.listen(port, () => {
  connectDB(); 
  console.log(`Server running on port ${port}`);
});
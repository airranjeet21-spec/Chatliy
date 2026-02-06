import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  }
});

const userSocketMap = {}; 

export const getReceiverSocketId = (receiver) => {
  return userSocketMap[receiver];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  // Check if userId is valid string "undefined" aur actual undefined dono handle honge
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  // Online users bhej rahe hain
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId && userId !== "undefined") {
      delete userSocketMap[userId];
    }
    // Yahan sirf emit karna hai, delete nahi!
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
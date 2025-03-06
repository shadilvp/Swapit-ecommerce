import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import http from "http";
import { Server } from "socket.io";
const app = express()
const server = http.createServer(app);

dotenv.config()
const port = process.env.PORT

import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productRouter.js";
import adminRouter from "./routes/adminRouter.js";
import userRouter from "./routes/userRouter.js";
import notificationRouter from "./routes/notificationRouter.js"
import messageRouter from "./routes/messageRouter.js";

import connectDB from "./config/db.js"
import errorHandler from "./middlewares/errorHandler.js"
import cookieParser from "cookie-parser"



connectDB()

app.use(express.json())
app.use(errorHandler)
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"],
}));

app.use('/api', authRouter) 
app.use('/api', productRouter)
app.use('/api',adminRouter)
app.use('/api',userRouter)
app.use('/api',notificationRouter)
app.use('/api', messageRouter);



const io = new Server(server, {
  cors: { origin: "http://localhost:3000", credentials: true },
});

io.on("connection", (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  socket.on("sendMessage", async ({ sender, receiver, message }) => {
    console.log(`📩 Message from ${sender} to ${receiver}: ${message}`);

    // Save message in DB
    const newMessage = new Message({ sender, receiver, message });
    await newMessage.save();

    // Emit message to receiver
    io.to(receiver).emit("receiveMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
  });
});



// Start Server
const startServer = (port) => {
  server.listen(port, () => console.log(`🚀 Server running on port ${port}`));

  process.on("SIGINT", () => {
    console.log("🔴 Closing server...");
    server.close(() => {
      console.log("✅ Server closed");
      process.exit(0);
    });
  });
};

startServer(port);
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
const app = express()

dotenv.config()
const port = process.env.PORT

import authRouter from "./routes/authRouter.js"
import productRouter from "./routes/productRouter.js"
import adminRouter from "./routes/adminRouter.js";
import userRouter from "./routes/userRouter.js"

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
}));

app.use('/api', authRouter) 
app.use('/api', productRouter)
app.use('/api',adminRouter)
app.use('/api',userRouter)

const startServer = (port) => {
    const server = app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  
    process.on('SIGINT', () => {
      console.log('🔴 Closing server...');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });
  };
  
  startServer(port);
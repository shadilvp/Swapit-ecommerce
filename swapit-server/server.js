import express from "express"
import cors from "cors"
import dotenv from "dotenv"
const app = express()

dotenv.config()
const port = process.env.PORT

import authRouter from "./routes/authRouter.js"
import connectDB from "./config/db.js"
import errorHandler from "./middlewares/errorHandler.js"

connectDB()

app.use(express.json())
app.use(errorHandler)

app.use('/api', authRouter)

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
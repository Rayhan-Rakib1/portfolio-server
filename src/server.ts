import dotenv from "dotenv";
import http, { Server } from "http";
import { prisma } from "./config/db";
import app from "./app";

dotenv.config();

let server: Server | null = null;

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully................");
  } catch (error) {
    console.log("Database not connected. !!!!!!!!!!!!!");
    process.exit(1);
  }
}

async function startServer() {
  try {
    await connectDB();
    server = http.createServer(app);
    server.listen(process.env.PORT, () => {
      console.log(`server is running on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error during server setup : ", error);
    process.exit(1);
  }
}

startServer();

import express from "express";
import mongoose, { Schema } from "mongoose";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({ path: "./data/config.env" });

app.use(
  cors({
    // cors is the npm pacakge which helps to work api got different domain
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if u dont use credentials it will not store cookies for frontend
  })
);

// using middleware for acception json from postman
// it helps to axcess json data
app.use(express.json());

// using cookie parse middleware
app.use(cookieParser());

app.use("/api/v1/users", userRouter); // to use router

app.use("/api/v1/task", taskRouter);

app.get("/", (req, res) => {
  res.send("nice");
});

// middleware for error handling
app.use(errorMiddleware);

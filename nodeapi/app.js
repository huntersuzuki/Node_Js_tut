import express from "express";
import userRouter from "./routes/User.js";
import { config } from "dotenv";

export const app = express();
config({
  path: "./data/config.env",
});
//using miidelware
app.use(express.json());
app.use(userRouter);

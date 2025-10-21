import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Application } from "express";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/');

export default app;
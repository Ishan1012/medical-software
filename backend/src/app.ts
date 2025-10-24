import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);

export default app;
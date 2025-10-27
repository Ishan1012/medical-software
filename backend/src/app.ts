import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes";
import appointmentRoutes from "./routes/AppointmentRoutes";
import consultRoutes from "./routes/ConsultRoutes";
import articleRoutes from "./routes/ArticleRoutes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/appointment', appointmentRoutes);
app.use('/api/v1/consult', consultRoutes);
app.use('/api/v1/consult', articleRoutes);

export default app;
import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes";
import appointmentRoutes from "./routes/AppointmentRoutes";
import consultRoutes from "./routes/ConsultRoutes";
import articleRoutes from "./routes/ArticleRoutes";
import feedbackRoutes from "./routes/FeedbackRoutes";
import doctorRoutes from "./routes/DoctorRoutes";
import patientRoutes from "./routes/PatientRoutes";

dotenv.config();

const app: Application = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://wellnestjs.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/doctor", doctorRoutes);
app.use("/api/v1/patient", patientRoutes);
app.use("/api/v1/appointment", appointmentRoutes);
app.use("/api/v1/consult", consultRoutes);
app.use("/api/v1/article", articleRoutes);
app.use("/api/v1/feedback", feedbackRoutes);

export default app;
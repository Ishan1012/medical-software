import { Document, Types } from "mongoose";

export interface PredictedCondition {
    disease: string;
    probability: "High" | "Moderate" | "Low";
}

export interface IConsult extends Document {
    userId: string;
    symptoms: string;
    specialist: string;
    description: string;
    predictedConditions: PredictedCondition[];
    suggestedActions: string[];
}
import { Document, Types } from "mongoose";

export interface IFeedback extends Document {
    name: string;
    patientId?: Types.ObjectId;
    testimonial: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}
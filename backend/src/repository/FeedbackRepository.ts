import { Types } from "mongoose";
import { IFeedback } from "../interface/IFeedback";
import Feedback from "../model/Feedback";

export class FeedbackRepository {
    async create(feedback: Promise<IFeedback>): Promise<IFeedback | null> {
        const newFeedback = new Feedback(feedback);
        return await newFeedback.save();
    }

    async findById(id: string): Promise<IFeedback | null> {
        return await Feedback.findOne({ id }).exec();
    }

    async findByPatientId(patientId: Types.ObjectId): Promise<IFeedback[]> {
        return await Feedback.find({ patientId }).exec();
    }

    async getAll(): Promise<IFeedback[]> {
        return await Feedback.find().exec();
    }

    async delete(id: string): Promise<void> {
        await Feedback.findOneAndDelete({ id });
    }
}
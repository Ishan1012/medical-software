import { Types } from "mongoose";
import { IFeedback } from "../interface/IFeedback";
import { FeedbackRepository } from "../repository/FeedbackRepository";

export class FeedbackService {
    private feedbackRepository: FeedbackRepository;

    constructor() {
        this.feedbackRepository = new FeedbackRepository();
    }

    async createFeedback(feedback: IFeedback): Promise<IFeedback | null> {
        return await this.feedbackRepository.create(feedback);
    }

    async findFeedbackById(id: string): Promise<IFeedback | null> {
        return await this.feedbackRepository.findById(id);
    }

    async findFeedbackByPatientId(patientId: string): Promise<IFeedback[]> {
        const patientIdObj = new Types.ObjectId(patientId);
        return await this.feedbackRepository.findByPatientId(patientIdObj);
    }

    async getAllFeedbacks(): Promise<IFeedback[]> {
        return await this.feedbackRepository.getAll();
    }

    async deleteFeedback(id: string): Promise<void> {
        await this.feedbackRepository.delete(id);
    }
}
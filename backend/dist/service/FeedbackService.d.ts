import { IFeedback } from "../interface/IFeedback";
export declare class FeedbackService {
    private feedbackRepository;
    constructor();
    createFeedback(feedback: IFeedback): Promise<IFeedback | null>;
    findFeedbackById(id: string): Promise<IFeedback | null>;
    findFeedbackByPatientId(patientId: string): Promise<IFeedback[]>;
    getAllFeedbacks(): Promise<IFeedback[]>;
    deleteFeedback(id: string): Promise<void>;
}
//# sourceMappingURL=FeedbackService.d.ts.map
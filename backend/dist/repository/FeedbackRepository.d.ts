import { Types } from "mongoose";
import { IFeedback } from "../interface/IFeedback";
export declare class FeedbackRepository {
    create(feedback: IFeedback): Promise<IFeedback | null>;
    findById(id: string): Promise<IFeedback | null>;
    findByPatientId(patientId: Types.ObjectId): Promise<IFeedback[]>;
    getAll(): Promise<IFeedback[]>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=FeedbackRepository.d.ts.map
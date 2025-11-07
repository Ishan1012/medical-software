import { Document, Types } from "mongoose";
export interface IConsult extends Document {
    patientId?: Types.ObjectId;
    name: string;
    age: number;
    gender: string;
    primarySymptoms: string;
    duration: string;
    severity: string;
    additionalSymptoms?: string;
    imageUrl?: string;
    timestamp: Date;
}
//# sourceMappingURL=IConsult.d.ts.map
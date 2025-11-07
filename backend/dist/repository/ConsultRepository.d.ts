import { Types } from "mongoose";
import { IConsult } from "../interface/IConsult";
export declare class ConsultRepository {
    create(consult: IConsult): Promise<IConsult | null>;
    findById(id: string): Promise<IConsult | null>;
    findByPatientId(patientId: Types.ObjectId): Promise<IConsult[]>;
    getAll(): Promise<IConsult[]>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=ConsultRepository.d.ts.map
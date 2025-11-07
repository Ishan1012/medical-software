import { IConsult } from "../interface/IConsult";
export declare class ConsultService {
    private consultRepository;
    constructor();
    saveConsult(consult: IConsult): Promise<IConsult | null>;
    findConsultById(id: string): Promise<IConsult | null>;
    findConsultByPatientId(patientId: string): Promise<IConsult[]>;
    getAllConsents(): Promise<IConsult[]>;
    deleteConsult(id: string): Promise<void>;
}
//# sourceMappingURL=ConsultService.d.ts.map
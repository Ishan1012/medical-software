import { IPatient } from "../interface/IPatient";
export declare class PatientRepository {
    create(patient: Partial<IPatient>): Promise<IPatient | null>;
    findById(id: string): Promise<IPatient | null>;
    findByEmail(email: string): Promise<IPatient | null>;
    getStatus(id: string): Promise<string>;
    getIsVerified(id: string): Promise<boolean | null>;
    getVerificationToken(id: string): Promise<string | null>;
    update(id: string, updatePatient: Partial<IPatient>): Promise<IPatient | null>;
    getAll(): Promise<IPatient[]>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=PatientRepository.d.ts.map
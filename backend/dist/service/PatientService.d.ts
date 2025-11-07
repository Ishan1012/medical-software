import { IPatient } from "../interface/IPatient";
export declare class PatientService {
    private patientRepository;
    constructor();
    savePatient(patient: Partial<IPatient>): Promise<IPatient | null>;
    findPatientById(id: string): Promise<IPatient | null>;
    findPatientByEmail(email: string): Promise<IPatient | null>;
    getPatientStatus(id: string): Promise<string | null>;
    isPatientVerified(id: string): Promise<boolean | null>;
    getVerificationToken(id: string): Promise<string | null>;
    updatePatient(id: string, updatePatient: Partial<IPatient>): Promise<IPatient | null>;
    getAllPatients(): Promise<IPatient[]>;
    deletePatient(id: string): Promise<void>;
}
//# sourceMappingURL=PatientService.d.ts.map
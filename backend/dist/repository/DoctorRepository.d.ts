import { IDoctor } from "../interface/IDoctor";
export declare class DoctorRepository {
    create(doctor: Partial<IDoctor>): Promise<IDoctor | null>;
    findById(id: string): Promise<IDoctor | null>;
    findByEmail(email: string): Promise<IDoctor | null>;
    findBySpeciality(speciality: string): Promise<IDoctor[]>;
    getStatus(id: string): Promise<string | null>;
    getIsVerified(id: string): Promise<boolean>;
    getVerificationToken(id: string): Promise<string | null>;
    getAvailability(id: string): Promise<string[]>;
    getTimeSlots(id: string): Promise<string[]>;
    update(id: string, updateDoctor: Partial<IDoctor>): Promise<IDoctor | null>;
    getAll(): Promise<IDoctor[]>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=DoctorRepository.d.ts.map
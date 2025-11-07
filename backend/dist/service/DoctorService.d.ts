import { IDoctor } from "../interface/IDoctor";
export declare class DoctorService {
    private doctorRepository;
    constructor();
    saveDoctor(doctor: Partial<IDoctor>): Promise<IDoctor | null>;
    findDoctorById(id: string): Promise<IDoctor | null>;
    findDoctorByEmail(email: string): Promise<IDoctor | null>;
    findDoctorBySpeciality(speciality: string): Promise<IDoctor[]>;
    getDoctorStatus(id: string): Promise<string | null>;
    isDoctorVerified(id: string): Promise<boolean | null>;
    getVerificationToken(id: string): Promise<string | null>;
    getAvailability(id: string): Promise<string[]>;
    getTimeSlots(id: string): Promise<string[]>;
    updateDoctor(id: string, updatePatient: Partial<IDoctor>): Promise<IDoctor | null>;
    getAllDoctors(): Promise<IDoctor[]>;
    deleteDoctor(id: string): Promise<void>;
}
//# sourceMappingURL=DoctorService.d.ts.map
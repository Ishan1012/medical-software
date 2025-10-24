import { IDoctor } from "../interface/IDoctor";
import { DoctorRepository } from "../repository/DoctorRepository";

export class DoctorService {
    private doctorRepository: DoctorRepository;

    constructor() {
        this.doctorRepository = new DoctorRepository();
    }

    async saveDoctor(doctor: Partial<IDoctor>): Promise<IDoctor | null> {
        return await this.doctorRepository.create(doctor);
    }

    async findDoctorById(id: string): Promise<IDoctor | null> {
        return await this.doctorRepository.findById(id);
    }

    async findDoctorByEmail(email: string): Promise<IDoctor | null> {
        return await this.doctorRepository.findByEmail(email);
    }

    async findDoctorBySpeciality(speciality: string): Promise<IDoctor[]> {
        return await this.doctorRepository.findBySpeciality(speciality);
    }

    async getDoctorStatus(id: string): Promise<string | null> {
        return await this.doctorRepository.getStatus(id);
    }

    async isDoctorVerified(id: string): Promise<boolean | null> {
        return await this.doctorRepository.getIsVerified(id);
    }

    async getVerificationToken(id: string): Promise<string | null> {
        return await this.doctorRepository.getVerificationToken(id);
    }

    async getAvailability(id: string): Promise<string[]> {
        return await this.doctorRepository.getAvailability(id);
    }

    async getTimeSlots(id: string): Promise<string[]> {
        return await this.doctorRepository.getTimeSlots(id);
    }

    async updateDoctor(id: string, updatePatient: Partial<IDoctor>): Promise<IDoctor | null> {
        return await this.doctorRepository.update(id, updatePatient);
    }

    async getAllDoctors(): Promise<IDoctor[]> {
        return await this.doctorRepository.getAll();
    }

    async deleteDoctor(id: string): Promise<void> {
        await this.doctorRepository.delete(id);
    }
}
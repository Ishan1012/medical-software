import { IDoctor, PopulatedDoctor } from "../interface/IDoctor";
import { DoctorRepository } from "../repository/DoctorRepository";

export class DoctorService {
    private doctorRepository: DoctorRepository;

    constructor() {
        this.doctorRepository = new DoctorRepository();
    }

    async saveDoctor(doctor: Partial<IDoctor>): Promise<IDoctor | null> {
        return await this.doctorRepository.create(doctor);
    }

    async findDoctorById(id: string): Promise<PopulatedDoctor | null> {
        return await this.doctorRepository.findById(id);
    }

    async findDoctorByEmail(email: string): Promise<PopulatedDoctor | null> {
        return await this.doctorRepository.findByEmail(email);
    }

    async findDoctorsBySpecialty(speciality: string): Promise<PopulatedDoctor[]> {
        return await this.doctorRepository.findBySpecialty(speciality);
    }

    async isDoctorVerified(id: string): Promise<boolean | null> {
        return await this.doctorRepository.getIsVerified(id);
    }

    async isDoctorPhoneVerified(id: string): Promise<boolean | null> {
        return await this.doctorRepository.getIsPhoneVerified(id);
    }

    async getDoctorByVerificationToken(verificationToken: string): Promise<IDoctor | null> {
        return await this.doctorRepository.getByVerificationToken(verificationToken);
    }

    async getAvailabilityAndTimeSlots(id: string): Promise<{ availability: string[], timeSlots: string[] }> {
        return await this.doctorRepository.getAvailabilityAndTimeSlots(id);
    }

    async updateDoctor(id: string, updatedDoctor: Partial<IDoctor>): Promise<IDoctor | null> {
        if (updatedDoctor.profileUrl === null) {
            delete updatedDoctor.profileUrl;
        }

        return await this.doctorRepository.update(id, updatedDoctor);
    }

    async getAllDoctors(): Promise<IDoctor[]> {
        return await this.doctorRepository.getAll();
    }

    async getAllRegisteredDoctors(): Promise<IDoctor[]> {
        return await this.doctorRepository.getAllRegistered();
    }

    async deleteDoctor(id: string): Promise<void> {
        await this.doctorRepository.delete(id);
    }
}
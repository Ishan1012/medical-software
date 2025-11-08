import { IPatient, PopulatedPatient } from "../interface/IPatient";
import { PatientRepository } from "../repository/PatientRepository";

export class PatientService {
    private patientRepository: PatientRepository;

    constructor() {
        this.patientRepository = new PatientRepository();
    }

    async savePatient(patient: Partial<IPatient>): Promise<IPatient | null> {
        return await this.patientRepository.create(patient);
    }

    async findPatientById(id: string): Promise<PopulatedPatient | null> {
        return await this.patientRepository.findById(id);
    }

    async findPatientByEmail(email: string): Promise<IPatient | null> {
        return await this.patientRepository.findByEmail(email);
    }

    async isPatientVerified(id: string): Promise<boolean | null> {
        return await this.patientRepository.getIsVerified(id);
    }

    async getPatientByVerificationToken(id: string): Promise<IPatient | null> {
        return await this.patientRepository.getByVerificationToken(id);
    }

    async updatePatient(id: string, updatePatient: Partial<IPatient>): Promise<IPatient | null> {
        return await this.patientRepository.update(id, updatePatient);
    }

    async getAllPatients(): Promise<IPatient[]> {
        return await this.patientRepository.getAll();
    }

    async deletePatient(id: string): Promise<void> {
        await this.patientRepository.delete(id);
    }
}
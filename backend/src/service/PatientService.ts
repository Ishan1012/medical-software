import { IPatient, PopulatedPatient } from "../interface/IPatient";
import { UpdateAppointment } from "../interface/UpdateAppointment";
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

    async isPatientPhoneVerified(id: string): Promise<boolean | null> {
        return await this.patientRepository.getIsPhoneVerified(id);
    }

    async getPatientByVerificationToken(id: string): Promise<IPatient | null> {
        return await this.patientRepository.getByVerificationToken(id);
    }

    async updatePatient(id: string, updatedPatient: Partial<IPatient> | UpdateAppointment): Promise<IPatient | null> {
        if (!('$push' in updatedPatient)) {
            if (updatedPatient.profileUrl === null) {
                delete updatedPatient.profileUrl;
            }
        }

        return await this.patientRepository.update(id, updatedPatient);
    }

    async getAllPatients(): Promise<IPatient[]> {
        return await this.patientRepository.getAll();
    }

    async deletePatient(id: string): Promise<void> {
        await this.patientRepository.delete(id);
    }
}
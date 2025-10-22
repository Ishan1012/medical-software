import { IPatient } from "../interface/IPatient";
import Patient from "../model/Patient";

export class PatientRepository {
    async create(patient: Partial<IPatient>): Promise<IPatient | null> {
        const newPatient = new Patient(patient);
        return await newPatient.save();
    }

    async findById(id: string): Promise<IPatient | null> {
        return await Patient.findOne({ id }).exec();
    }

    async findByEmail(email: string): Promise<IPatient | null> {
        return await Patient.findOne({ email });
    }

    async getStatus(id: string): Promise<string> {
        const patient = await Patient.findOne({ id }).select('status').lean().exec();
        return patient?.status || 'active';
    }
    
    async getIsVerified(id: string): Promise<boolean> {
        const patient = await Patient.findOne({ id }).select('isVerified').lean().exec();
        return patient?.isVerified || false;
    }

    async getVerificationToken(id: string): Promise<string | null> {
        const patient = await Patient.findOne({ id }).select('verificationToken').lean().exec();
        return patient?.verificationToken || null;
    }

    async getAll(): Promise<IPatient[]> {
        return await Patient.find().exec();
    }

    async delete(id: string): Promise<void> {
        await Patient.findOneAndDelete({ id });
    }
}
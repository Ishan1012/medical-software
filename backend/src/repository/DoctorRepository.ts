import { IDoctor } from "../interface/IDoctor";
import Doctor from "../model/Doctor";

export class DoctorRepository {
    async create(doctor: Partial<IDoctor>): Promise<IDoctor | null> {
        const newDoctor = new Doctor(doctor);
        return await newDoctor.save();
    }

    async findBySpeciality(speciality: string): Promise<IDoctor[]> {
        return await Doctor.find({ speciality }).exec();
    }

    async getStatus(id: string): Promise<string | null> {
        const doctor = await Doctor.findOne({ id }).select('status').lean().exec();
        return doctor?.status || null;
    }

    async getVerificationToken(id: string): Promise<string | null> {
        const doctor = await Doctor.findOne({ id }).select('verificationToken').lean().exec();
        return doctor?.verificationToken || '';
    }
    
    async getAvailability(id: string): Promise<string[]> {
        const doctor = await Doctor.findOne({ id }).select('verificationToken').lean().exec();
        return doctor?.availability || [];
    }

    async getTimeSlots(id: string): Promise<string[]> {
        const doctor = await Doctor.findOne({ id }).select('timeSlots').lean().exec();
        return doctor?.timeSlots || [];
    }

    async update(id: string, updateDoctor: Partial<IDoctor>): Promise<IDoctor | null> {
        return await Doctor.findOneAndUpdate({ id }, { updateDoctor }, { new: true }).exec();
    }

    async getAll(): Promise<IDoctor[]> {
        return await Doctor.find().exec();
    }

    async delete(id: string): Promise<void> {
        await Doctor.findOneAndDelete({ id });
    }
}
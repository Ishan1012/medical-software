import { IDoctor } from "../interface/IDoctor";
import Doctor from "../model/Doctor";

export class DoctorRepository {
    async create(doctor: Partial<IDoctor>): Promise<IDoctor | null> {
        const newDoctor = new Doctor(doctor);
        return await newDoctor.save();
    }

    async findById(id: string): Promise<IDoctor | null> {
        return await Doctor.findOne({ id }).select('-password -isOAuth -verificationToken -isVerified -isPhoneVerified -detailsComplete -status -isAdmin').exec();
    }

    async findByEmail(email: string): Promise<IDoctor | null> {
        return await Doctor.findOne({ email }).select('-password -isOAuth -verificationToken -isVerified -isPhoneVerified -detailsComplete -status -isAdmin').exec();
    }

    async findBySpecialty(specialty: string): Promise<IDoctor[]> {
        return await Doctor.find({ specialty }).select('-password -isOAuth -verificationToken -isVerified -isPhoneVerified -detailsComplete -status -isAdmin').exec();
    }

    async getIsVerified(id: string): Promise<boolean> {
        const doctor = await Doctor.findOne({ id }).select('isVerified').lean().exec();
        return doctor?.isVerified || false;
    }

    async getIsPhoneVerified(id: string): Promise<boolean> {
        const doctor = await Doctor.findOne({ id }).select('isPhoneVerified').lean().exec();
        return doctor?.isPhoneVerified || false;
    }

    async getByVerificationToken(verificationToken: string): Promise<IDoctor | null> {
        const doctor = await Doctor.findOne({ verificationToken }).select('-password -isOAuth -isPhoneVerified -detailsComplete -status -isAdmin').exec();
        return doctor;
    }

    async getAvailabilityAndTimeSlots(id: string): Promise<{ availability: string[], timeSlots: string[] }> {
        const doctor = await Doctor.findOne({ _id: id }).select('availability timeSlots').lean().exec();

        return {
            availability: doctor?.availability || [],
            timeSlots: doctor?.timeSlots || []
        };
    }

    async update(id: string, updateDoctor: Partial<IDoctor>): Promise<IDoctor | null> {
        return await Doctor.findOneAndUpdate({ id }, { $set: updateDoctor }, { new: true, runValidators: true }).exec();
    }

    async getAll(): Promise<IDoctor[]> {
        return await Doctor.find().select('-password -isOAuth -verificationToken -isVerified -isPhoneVerified -detailsComplete -status -isAdmin').exec();
    }

    async delete(id: string): Promise<void> {
        await Doctor.findOneAndDelete({ id });
    }
}
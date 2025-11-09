import { IDoctor, PopulatedDoctor } from "../interface/IDoctor";
import Doctor from "../model/Doctor";

export class DoctorRepository {
    async create(doctor: Partial<IDoctor>): Promise<IDoctor | null> {
        const newDoctor = new Doctor(doctor);
        return await newDoctor.save();
    }

    async findById(id: string): Promise<PopulatedDoctor | null> {
        return await Doctor.findOne({ id })
            .select('-password -isOAuth -isPhoneVerified -isVerified -verificationToken -status -isAdmin')
            .populate({
                path: 'upcomingAppointments',
                match: { status: { $ne: 'Completed' } },
                options: { sort: { date: 1, time: 1 } },
                populate: {
                    path: 'patientInfo',
                    select: '-password -isOAuth -isPhoneVerified -detailsComplete -status -isAdmin'
                }
            })
            .populate({
                path: 'medicalRecords',
                match: { status: 'Completed' },
                options: { sort: { date: -1, time: -1 } },
                populate: {
                    path: 'patientInfo',
                    select: '-password -isOAuth -isPhoneVerified -detailsComplete -status -isAdmin'
                }
            })
            .exec() as PopulatedDoctor | null;
    }

    async findByEmail(email: string): Promise<PopulatedDoctor | null> {
        return await Doctor.findOne({ email })
            .select('-password -isOAuth -verificationToken -isVerified -isPhoneVerified -detailsComplete -status -isAdmin')
            .populate({
                path: 'upcomingAppointments',
                match: { status: { $ne: 'Completed' } },
                options: { sort: { date: 1, time: 1 } },
                populate: {
                    path: 'patientInfo',
                    select: '-password -isOAuth -isPhoneVerified -detailsComplete -status -isAdmin'
                }
            })
            .populate({
                path: 'medicalRecords',
                match: { status: 'Completed' },
                options: { sort: { date: -1, time: -1 } },
                populate: {
                    path: 'patientInfo',
                    select: '-password -isOAuth -isPhoneVerified -detailsComplete -status -isAdmin'
                }
            })
            .exec() as PopulatedDoctor | null;
    }

    async findBySpecialty(specialty: string): Promise<PopulatedDoctor[]> {
        return await Doctor.find({ specialty, detailsComplete: true }).populate('upcomingAppointments').select('-password -isOAuth -verificationToken -isVerified -isPhoneVerified -status -isAdmin');
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
        return await Doctor.find().select('-password -isOAuth -verificationToken -isVerified -isPhoneVerified -status -isAdmin').exec();
    }

    async getAllRegistered(): Promise<IDoctor[]> {
        return await Doctor.find(
            { detailsComplete: true },
            { password: 0, isOAuth: 0, verificationToken: 0, isVerified: 0, isPhoneVerified: 0, status: 0, isAdmin: 0 }
        );
    }

    async delete(id: string): Promise<void> {
        await Doctor.findOneAndDelete({ id });
    }
}
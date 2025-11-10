import { IPatient, PopulatedPatient } from "../interface/IPatient";
import Patient from "../model/Patient";

export class PatientRepository {
    async create(patient: Partial<IPatient>): Promise<IPatient | null> {
        const newPatient = new Patient(patient);
        return await newPatient.save();
    }

    async findById(id: string): Promise<PopulatedPatient | null> {
        return await Patient.findOne({ id })
            .select('-password -isOAuth -isPhoneVerified -isVerified -verificationToken -status -isAdmin')
            .populate({
                path: 'upcomingAppointments',
                match: { status: { $ne: 'Completed' } },
                options: { sort: { date: 1, time: 1 } },
                populate: {
                    path: 'doctor',
                    select: '-password -isOAuth -isPhoneVerified -detailsComplete -status -isAdmin'
                }
            })
            .populate({
                path: 'medicalRecords',
                match: { status: 'Completed' },
                options: { sort: { date: -1, time: -1 } },
                populate: {
                    path: 'doctor',
                    select: '-password -isOAuth -isPhoneVerified -detailsComplete -status -isAdmin'
                }
            })
            .exec() as PopulatedPatient | null;
    }

    async findByIdUnpop(id: string): Promise<IPatient | null> {
        return await Patient.findOne({ id });
    }

    async findByEmail(email: string): Promise<IPatient | null> {
        return await Patient.findOne({ email }).exec();
    }

    async getIsVerified(id: string): Promise<boolean | null> {
        const patient = await Patient.findOne({ id }).select('isVerified').lean().exec();
        return patient?.isVerified || null;
    }

    async getIsPhoneVerified(id: string): Promise<boolean> {
        const patient = await Patient.findOne({ id }).select('isPhoneVerified').lean().exec();
        return patient?.isPhoneVerified || false;
    }

    async getByVerificationToken(verificationToken: string): Promise<IPatient | null> {
        const patient = await Patient.findOne({ verificationToken }).select('-password -isOAuth -isPhoneVerified -detailsComplete -status -isAdmin').exec();
        return patient;
    }

    async update(id: string, updatedPatient: Partial<IPatient>): Promise<IPatient | null> {
        return await Patient.findOneAndUpdate({ id }, { $set: updatedPatient }, { new: true, runValidators: true }).exec();
    }

    async getAll(): Promise<IPatient[]> {
        return await Patient.find().exec();
    }

    async delete(id: string): Promise<void> {
        await Patient.findOneAndDelete({ id });
    }
}
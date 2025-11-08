import { IPatient, PopulatedPatient } from "../interface/IPatient";
import Patient from "../model/Patient";

export class PatientRepository {
    async create(patient: Partial<IPatient>): Promise<IPatient | null> {
        const newPatient = new Patient(patient);
        return await newPatient.save();
    }

    async findById(id: string): Promise<PopulatedPatient | null> {
        const now = new Date();

        return await Patient.findOne({ id })
            .select('-password -isOAuth -isPhoneVerified -isVerified -verificationToken -status -isAdmin')
            .populate({
                path: 'upcomingAppointments',
                match: { date: { $gte: now } },
                options: { sort: { date: 1, time: 1 } },
                populate: {
                    path: 'doctor',
                    select: '-password -isOAuth -isPhoneVerified -detailsComplete -status -isAdmin'
                }
            })
            .populate({
                path: 'medicalRecords',
                match: { date: { $lt: now } },
                options: { sort: { date: -1, time: -1 } },
                populate: {
                    path: 'doctor',
                    select: '-password -isOAuth -isPhoneVerified -detailsComplete -status -isAdmin'
                }
            })
            .exec() as PopulatedPatient | null;
    }

    async findByEmail(email: string): Promise<IPatient | null> {
        return await Patient.findOne({ email }).exec();
    }

    async getIsVerified(id: string): Promise<boolean | null> {
        const patient = await Patient.findOne({ id }).select('isVerified').lean().exec();
        return patient?.isVerified || null;
    }

    async getByVerificationToken(verificationToken: string): Promise<IPatient | null> {
        const patient = await Patient.findOne({ verificationToken }).select('-password -isOAuth -isPhoneVerified -detailsComplete -status -isAdmin').exec();
        return patient;
    }

    async update(id: string, updatePatient: Partial<IPatient>): Promise<IPatient | null> {
        return await Patient.findOneAndUpdate({ id }, { $set: updatePatient }, { new: true, runValidators: true }).exec();
    }

    async getAll(): Promise<IPatient[]> {
        return await Patient.find().exec();
    }

    async delete(id: string): Promise<void> {
        await Patient.findOneAndDelete({ id });
    }
}
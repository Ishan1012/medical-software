import { Types } from "mongoose";
import { IAppointment } from "../interface/IAppointment";
import Appointment from "../model/Appointment";

export class AppointmentRepository {
    async create(record: Partial<IAppointment>): Promise<IAppointment | null> {
        const newRecord = new Appointment(record);
        return await newRecord.save();
    }

    async findById(id: string): Promise<IAppointment | null> {
        return await Appointment.findOne({ id }).exec();
    }

    async findByPatientId(patientId: Types.ObjectId): Promise<IAppointment[]> {
        return await Appointment.find({ patientId }).exec();
    }

    async findByDoctorId(doctorId: Types.ObjectId): Promise<IAppointment[]> {
        return await Appointment.find({ doctorId }).exec();
    }

    async getStatus(id: string): Promise<string | null> {
        const record = await Appointment.findOne({ id }).select('select').lean().exec();
        return record?.status || null;
    }

    async setStatus(id: string, newStatus: string): Promise<IAppointment | null> {
        const record = await Appointment.findOneAndUpdate({ id }, { $set: { status: newStatus } }).exec();
        return record;
    }

    async getAll(): Promise<IAppointment[]> {
        return await Appointment.find().exec();
    }

    async delete(id: string): Promise<void> {
        await Appointment.findOneAndDelete({ id });
    }
}
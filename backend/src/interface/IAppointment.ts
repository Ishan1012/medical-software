import { Document, Types } from "mongoose";

export interface IAppointment extends Document{
    createdAt: Date;
    appointmentType: string;
    doctorId: Types.ObjectId;
    patientId: Types.ObjectId;
    fullname: string;
    address: string;
    age: number;
    phone: string;
    gender: string;
    email: string;
    appointmentDate: Date;
    appointmentTime: string;
    concern?: string;
    status: string;
}
import { Document, Types } from "mongoose";

export interface IRecord extends Document{
    usertype: string;
    createdAt: Date;
    status: string;
    doctorId: Types.ObjectId;
    patientId: Types.ObjectId;
}
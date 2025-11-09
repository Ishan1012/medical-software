import { Types } from "mongoose";

type updateField = 'upcomingAppointments' | 'medicalRecords';

export type UpdateAppointment = {
    $push: Partial<Record<updateField, Types.ObjectId>>;
};

import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IAppointment, PatientInfo } from '../interface/IAppointment';

const patientInfoSchema = new Schema<PatientInfo>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format']
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    concern: {
        type: String,
        required: true,
        trim: true
    },
}, { _id: false });

const appointmentSchema = new Schema<IAppointment>({
    id: {
        type: String,
        default: () => "APPOINTMENT" + uuidv4().replace(/-/g, "").slice(0, 10),
        unique: true
    },
    patientId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Confirmed', 'Rescheduled', 'Canceled', 'In-Progress', 'Completed'],
        default: 'Scheduled'
    },
    type: {
        type: String,
        required: true,
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    patientInfo: {
        type: patientInfoSchema,
        required: true
    },
    reportUrl: {
        type: String,
        required: function (this: IAppointment) {
            return this.status === "Completed";
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Appointment = model<IAppointment>('Appointments', appointmentSchema);

export default Appointment;
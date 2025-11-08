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

// id: {
//         type: String,
//         default: () => "APPOINTMENT" + uuidv4().replace(/-/g, "").slice(0, 10),
//         unique: true
//     },
//     createdAt: { type: Date, default: Date.now },
//     appointmentType: {
//         type: String,
//         required: true,
//         enum: ['general','specialist','followup']
//     },
//     doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
//     patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
//     fullname: {
//         type: String,
//         required: true,
//         minlength: [1,'name cannot be null']
//     },
//     address: {
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     phone: {
//         type: String,
//         required: true,
//         match: [/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format']
//     },
//     gender: {
//         type: String,
//         required: true,
//         enum: ['male','female','other']
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     appointmentDate: {
//         type: Date,
//         required: true
//     },
//     appointmentTime: {
//         type: String,
//         required: true
//     },
//     concern: {
//         type: String,
//         required: false
//     },
//     status: {
//         type: String,
//         enum: ['Scheduled', 'Confirmed', 'Rescheduled', 'Canceled', 'In-Progress', 'Completed'],
//         default: 'Scheduled'
//     },
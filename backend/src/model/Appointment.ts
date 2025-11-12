import { HydratedDocument, Schema, Types, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IAppointment, PatientInfo } from '../interface/IAppointment';
import Doctor from './Doctor';
import { CallbackError } from 'mongoose';
import Patient from './Patient';

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
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Confirmed', 'Rescheduled', 'Cancelled', 'In-Progress', 'Completed'],
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

appointmentSchema.post<HydratedDocument<IAppointment>>('save', async function (appointment, next: (err?: CallbackError) => void) {
    try {
        if (!appointment || !appointment._id) return next();

        const appointmentId = appointment._id as unknown as Types.ObjectId;

        if (appointment.userId) {
            const patient = await Patient.findOne({ id: appointment.userId });

            if (patient) {
                const validAppointments = await Appointment.find(
                    { _id: { $in: patient.upcomingAppointments } },
                    { _id: 1 }
                ).lean();

                const validIds = validAppointments.map(a => a._id.toString());

                // keep only ones still valid
                patient.upcomingAppointments = patient.upcomingAppointments.filter(id =>
                    validIds.includes(id.toString())
                );

                if (!patient.upcomingAppointments.some(id => id.equals(appointmentId))) {
                    patient.upcomingAppointments.push(appointmentId);
                }

                await patient.save();
            }
        }

        const doctor = await Doctor.findById(appointment.doctor);
        if (doctor) {
            const validAppointments = await Appointment.find(
                { _id: { $in: doctor.upcomingAppointments } },
                { _id: 1 }
            ).lean();

            const validIds = validAppointments.map(a => a._id.toString());

            doctor.upcomingAppointments = doctor.upcomingAppointments.filter(id =>
                validIds.includes(id.toString())
            );

            if (!doctor.upcomingAppointments.some(id => id.equals(appointmentId))) {
                doctor.upcomingAppointments.push(appointmentId);
            }

            await doctor.save();
        }

        next();
    } catch (err: any) {
        next(err);
    }
}
);

const Appointment = model<IAppointment>('Appointments', appointmentSchema);

export default Appointment;
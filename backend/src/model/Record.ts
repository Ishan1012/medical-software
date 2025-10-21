import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IRecord } from '../interface/IRecord';

const recordSchema = new Schema<IRecord>({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    usertype: {
        type: String,
        enum: ['doctor', 'patient'],
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['Scheduled', 'Confirmed', 'Rescheduled', 'Canceled', 'In-Progress', 'Completed'],
        default: 'Scheduled'
    },
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true }
});

const Record = model<IRecord>('Record', recordSchema);

export default Record;
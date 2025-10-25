import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IConsult } from '../interface/IConsult';
import { model } from 'mongoose';

const consultSchema = new Schema<IConsult>({
    id: {
        type: String,
        default: () => "CON" + uuidv4().replace(/-/g, "").slice(0, 10),
        unique: true
    },
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient' },
    name: { type: String, reqiured: true },
    age: { type: Number, reqiured: true, min: 0 },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'NTS'],
        required: true
    },
    primarySymptoms: { type: String, reqiured: true },
    duration: {
        type: String,
        enum: ['less-than-day', '1-3-days', '1-week', '1-month', 'more-than-month'],
        required: true
    },
    severity: {
        type: String,
        enum: ['mild', 'moderate', 'severe'],
        required: true
    },
    additionalSymptoms: { type: String, reqiured: false },
    imageUrl: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Consult = model<IConsult>('Consult', consultSchema);

export default Consult;
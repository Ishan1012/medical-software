import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IConsult, PredictedCondition } from '../interface/IConsult';
import { model } from 'mongoose';

const predictedConditionSchema = new Schema<PredictedCondition>({
    disease: {
        type: String,
        required: true,
        trim: true
    },
    probability: {
        type: String,
        enum: ["High", "Moderate", "Low"],
        required: true
    }
}, { _id: false });

const consultSchema = new Schema<IConsult>({
    id: {
        type: String,
        default: () => "CON" + uuidv4().replace(/-/g, "").slice(0, 10),
        unique: true
    },
    userId: {
        type: String,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    specialist: {
        type: String,
        required: true
    },
    predictedConditions: {
        type: [predictedConditionSchema],
        required: true
    },
    suggestedActions: {
        type: [String],
        required: true
    }
});

const Consult = model<IConsult>('Consult', consultSchema);

export default Consult;
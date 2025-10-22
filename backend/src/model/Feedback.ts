import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IFeedback } from '../interface/IFeedback';

const feedbackSchema = new Schema<IFeedback>({
    id: {
        type: String,
        default: () => "FEED" + uuidv4().replace(/-/g, "").slice(0, 10),
        unique: true
    },
    name: { type: String, required: true },
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient' },
    testimonial: { type: String, required: true },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating cannot be more than 5'],
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Feedback = model<IFeedback>('Feedback', feedbackSchema);

export default Feedback;
import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IPatient } from '../interface/IPatient';

const patientSchema = new Schema<IPatient>({
    id: {
        type: String,
        default: () => "PAT" + uuidv4().replace(/-/g, "").slice(0, 10),
        unique: true
    },
    name: { type: String, required: true },
    email: { type: String, reqiured: true, unique: true },
    password: {
        type: String,
        required: function (this: IPatient) {
            // Only required if not OAuth
            return !this.isOAuth;
        },
    },
    isOAuth: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'blocked', 'suspended', 'deleted'],
        default: 'active'
    },
    phone: {
        type: String,
        required: true
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, required: false },
    profile: {
        type: String,
        default: '/images/user-default.jpg',
    },
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    country: { type: String, required: false }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Patient = model<IPatient>('Patient', patientSchema);

export default Patient;
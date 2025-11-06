import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IDoctor } from '../interface/IDoctor';
import { IPatient } from '../interface/IPatient';

const doctorSchema = new Schema<IDoctor>({
    id: {
        type: String,
        default: () => "DOC" + uuidv4().replace(/-/g, "").slice(0, 10),
        unique: true,
    },
    name: { type: String, reqiured: true },
    email: { type: String, required: true, unique: true },
    password: { 
        type: String, 
        required: function (this: IDoctor) {
            return !this.isOAuth;
        },
    },
    isOAuth: {
        type: Boolean,
        default: false
    },
    speciality: { type: String, reqiured: false },
    qualification: { type: String, reqiured: false },
    profileUrl: { type: String, required: false },
    status: {
        type: String,
        enum: ['active', 'inactive', 'blocked', 'suspended', 'deleted'],
        default: 'active'
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, required: false },
    isAdmin: { type: Boolean, default: false },
    phone: {
        type: String,
        required: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    availability: {
        type: [String],
        default: [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
        ],
    },
    timeSlots: {
        type: [String],
        default: [
            '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
            '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
        ],
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating cannot be more than 5'],
    },
    ratingCount: { type: Number, default: 0 },
    experience: { type: String, required: false, min: 0 },
    description: { type: String, required: false },
    whatsapp: { type: String, required: false },
    instagram: { type: String, required: false },
    facebook: { type: String, required: false },
    x: { type: String, required: false }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Doctor = model<IDoctor>('Doctor', doctorSchema);

export default Doctor;
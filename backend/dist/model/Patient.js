"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const patientSchema = new mongoose_1.Schema({
    id: {
        type: String,
        default: () => "PAT" + (0, uuid_1.v4)().replace(/-/g, "").slice(0, 10),
        unique: true
    },
    name: { type: String, required: true },
    email: { type: String, reqiured: true, unique: true },
    password: {
        type: String,
        required: function () {
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
        required: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, required: false },
    profileUrl: {
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
const Patient = (0, mongoose_1.model)('Patient', patientSchema);
exports.default = Patient;
//# sourceMappingURL=Patient.js.map
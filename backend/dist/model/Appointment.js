"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const appointmentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        default: () => "APPOINTMENT" + (0, uuid_1.v4)().replace(/-/g, "").slice(0, 10),
        unique: true
    },
    createdAt: { type: Date, default: Date.now },
    appointmentType: {
        type: String,
        required: true,
        enum: ['general', 'specialist', 'followup']
    },
    doctorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Patient', required: true },
    fullname: {
        type: String,
        required: true,
        minlength: [1, 'name cannot be null']
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    phone: {
        type: String,
        required: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format']
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    email: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    concern: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Confirmed', 'Rescheduled', 'Canceled', 'In-Progress', 'Completed'],
        default: 'Scheduled'
    },
});
const Appointment = (0, mongoose_1.model)('Appointments', appointmentSchema);
exports.default = Appointment;
//# sourceMappingURL=Appointment.js.map
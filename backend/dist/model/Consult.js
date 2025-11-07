"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const mongoose_2 = require("mongoose");
const consultSchema = new mongoose_1.Schema({
    id: {
        type: String,
        default: () => "CON" + (0, uuid_1.v4)().replace(/-/g, "").slice(0, 10),
        unique: true
    },
    patientId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Patient' },
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
const Consult = (0, mongoose_2.model)('Consult', consultSchema);
exports.default = Consult;
//# sourceMappingURL=Consult.js.map
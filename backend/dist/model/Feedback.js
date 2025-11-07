"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const feedbackSchema = new mongoose_1.Schema({
    id: {
        type: String,
        default: () => "FEED" + (0, uuid_1.v4)().replace(/-/g, "").slice(0, 10),
        unique: true
    },
    name: { type: String, required: true },
    patientId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Patient' },
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
const Feedback = (0, mongoose_1.model)('Feedback', feedbackSchema);
exports.default = Feedback;
//# sourceMappingURL=Feedback.js.map
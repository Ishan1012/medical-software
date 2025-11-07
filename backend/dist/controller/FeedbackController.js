"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeedback = exports.getAllFeedbacks = exports.findFeedbackByPatientId = exports.findFeedbackById = exports.createFeedback = void 0;
const FeedbackService_1 = require("../service/FeedbackService");
const feedbackService = new FeedbackService_1.FeedbackService();
const createFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedback = yield feedbackService.createFeedback(req.body);
        if (!feedback) {
            return res.status(400).json({ success: false, message: "Unable to create the feedback!" });
        }
        return res.status(201).json({ success: true, feedback });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.createFeedback = createFeedback;
const findFeedbackById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(403).json({ success: false, message: "feedback id is required!" });
        }
        const feedback = yield feedbackService.findFeedbackById(id);
        if (!feedback) {
            return res.status(400).json({ success: false, message: "Unable to find the feedback!" });
        }
        return res.status(201).json({ success: true, feedback });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.findFeedbackById = findFeedbackById;
const findFeedbackByPatientId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = req.params.patientId;
        if (!patientId) {
            return res.status(403).json({ success: false, message: "patient id is required!" });
        }
        const feedbacks = yield feedbackService.findFeedbackByPatientId(patientId);
        if (!feedbacks || feedbacks.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find the feedbacks!" });
        }
        return res.status(201).json({ success: true, feedbacks });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.findFeedbackByPatientId = findFeedbackByPatientId;
const getAllFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedbacks = yield feedbackService.getAllFeedbacks();
        if (!feedbacks || feedbacks.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find the feedbacks!" });
        }
        return res.status(201).json({ success: true, feedbacks });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.getAllFeedbacks = getAllFeedbacks;
const deleteFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(403).json({ success: false, message: "id is required!" });
        }
        yield feedbackService.deleteFeedback(id);
        return res.status(201).json({ success: true, message: "Feedback deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.deleteFeedback = deleteFeedback;
//# sourceMappingURL=FeedbackController.js.map
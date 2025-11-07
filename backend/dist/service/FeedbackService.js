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
exports.FeedbackService = void 0;
const mongoose_1 = require("mongoose");
const FeedbackRepository_1 = require("../repository/FeedbackRepository");
class FeedbackService {
    constructor() {
        this.feedbackRepository = new FeedbackRepository_1.FeedbackRepository();
    }
    createFeedback(feedback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.feedbackRepository.create(feedback);
        });
    }
    findFeedbackById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.feedbackRepository.findById(id);
        });
    }
    findFeedbackByPatientId(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const patientIdObj = new mongoose_1.Types.ObjectId(patientId);
            return yield this.feedbackRepository.findByPatientId(patientIdObj);
        });
    }
    getAllFeedbacks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.feedbackRepository.getAll();
        });
    }
    deleteFeedback(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.feedbackRepository.delete(id);
        });
    }
}
exports.FeedbackService = FeedbackService;
//# sourceMappingURL=FeedbackService.js.map
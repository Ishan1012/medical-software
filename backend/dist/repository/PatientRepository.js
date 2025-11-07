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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRepository = void 0;
const Patient_1 = __importDefault(require("../model/Patient"));
class PatientRepository {
    create(patient) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPatient = new Patient_1.default(patient);
            return yield newPatient.save();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Patient_1.default.findOne({ id }).exec();
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Patient_1.default.findOne({ email });
        });
    }
    getStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const patient = yield Patient_1.default.findOne({ id }).select('status').lean().exec();
            return (patient === null || patient === void 0 ? void 0 : patient.status) || 'active';
        });
    }
    getIsVerified(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const patient = yield Patient_1.default.findOne({ id }).select('isVerified').lean().exec();
            return (patient === null || patient === void 0 ? void 0 : patient.isVerified) || null;
        });
    }
    getVerificationToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const patient = yield Patient_1.default.findOne({ id }).select('verificationToken').lean().exec();
            return (patient === null || patient === void 0 ? void 0 : patient.verificationToken) || null;
        });
    }
    update(id, updatePatient) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Patient_1.default.findOneAndUpdate({ id }, { $set: updatePatient }, { new: true, runValidators: true }).exec();
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Patient_1.default.find().exec();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Patient_1.default.findOneAndDelete({ id });
        });
    }
}
exports.PatientRepository = PatientRepository;
//# sourceMappingURL=PatientRepository.js.map
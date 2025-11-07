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
exports.DoctorRepository = void 0;
const Doctor_1 = __importDefault(require("../model/Doctor"));
class DoctorRepository {
    create(doctor) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDoctor = new Doctor_1.default(doctor);
            return yield newDoctor.save();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Doctor_1.default.findOne({ id }).exec();
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Doctor_1.default.findOne({ email }).exec();
        });
    }
    findBySpeciality(speciality) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Doctor_1.default.find({ speciality }).exec();
        });
    }
    getStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield Doctor_1.default.findOne({ id }).select('status').lean().exec();
            return (doctor === null || doctor === void 0 ? void 0 : doctor.status) || null;
        });
    }
    getIsVerified(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield Doctor_1.default.findOne({ id }).select('isVerified').lean().exec();
            return (doctor === null || doctor === void 0 ? void 0 : doctor.isVerified) || false;
        });
    }
    getVerificationToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield Doctor_1.default.findOne({ id }).select('verificationToken').lean().exec();
            return (doctor === null || doctor === void 0 ? void 0 : doctor.verificationToken) || null;
        });
    }
    getAvailability(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield Doctor_1.default.findOne({ id }).select('verificationToken').lean().exec();
            return (doctor === null || doctor === void 0 ? void 0 : doctor.availability) || [];
        });
    }
    getTimeSlots(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctor = yield Doctor_1.default.findOne({ id }).select('timeSlots').lean().exec();
            return (doctor === null || doctor === void 0 ? void 0 : doctor.timeSlots) || [];
        });
    }
    update(id, updateDoctor) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Doctor_1.default.findOneAndUpdate({ id }, { $set: updateDoctor }, { new: true, runValidators: true }).exec();
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Doctor_1.default.find().exec();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Doctor_1.default.findOneAndDelete({ id });
        });
    }
}
exports.DoctorRepository = DoctorRepository;
//# sourceMappingURL=DoctorRepository.js.map
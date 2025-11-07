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
exports.AppointmentRepository = void 0;
const Appointment_1 = __importDefault(require("../model/Appointment"));
class AppointmentRepository {
    create(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const newRecord = new Appointment_1.default(record);
            return yield newRecord.save();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Appointment_1.default.findOne({ id }).exec();
        });
    }
    findByPatientId(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Appointment_1.default.find({ patientId }).sort({ createdAt: -1 }).exec();
        });
    }
    findByDoctorId(doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Appointment_1.default.find({ doctorId }).sort({ createdAt: -1 }).exec();
        });
    }
    getStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield Appointment_1.default.findOne({ id }).select('select').lean().exec();
            return (record === null || record === void 0 ? void 0 : record.status) || null;
        });
    }
    setStatus(id, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield Appointment_1.default.findOneAndUpdate({ id }, { $set: { status: newStatus, runValidators: true } }).exec();
            return record;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Appointment_1.default.find().sort({ createdAt: -1 }).exec();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Appointment_1.default.findOneAndDelete({ id });
        });
    }
}
exports.AppointmentRepository = AppointmentRepository;
//# sourceMappingURL=AppointmentRepository.js.map
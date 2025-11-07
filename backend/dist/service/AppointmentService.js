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
exports.AppointmentService = void 0;
const mongoose_1 = require("mongoose");
const AppointmentRepository_1 = require("../repository/AppointmentRepository");
class AppointmentService {
    constructor() {
        this.appointmentRepository = new AppointmentRepository_1.AppointmentRepository();
    }
    createAppointment(appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.appointmentRepository.create(appointment);
        });
    }
    findAppointmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.appointmentRepository.findById(id);
        });
    }
    findAppointmentByPatientId(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const patientIdObj = new mongoose_1.Types.ObjectId(patientId);
            return yield this.appointmentRepository.findByPatientId(patientIdObj);
        });
    }
    findAppointmentByDoctorId(doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorIdObj = new mongoose_1.Types.ObjectId(doctorId);
            return yield this.appointmentRepository.findByPatientId(doctorIdObj);
        });
    }
    getStatusOfAppointment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.appointmentRepository.getStatus(id);
        });
    }
    setStatusOfAppointment(id, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.appointmentRepository.setStatus(id, newStatus);
        });
    }
    getAllAppointments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.appointmentRepository.getAll();
        });
    }
    deleteAppointment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.appointmentRepository.delete(id);
        });
    }
}
exports.AppointmentService = AppointmentService;
//# sourceMappingURL=AppointmentService.js.map
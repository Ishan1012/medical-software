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
exports.DoctorService = void 0;
const DoctorRepository_1 = require("../repository/DoctorRepository");
class DoctorService {
    constructor() {
        this.doctorRepository = new DoctorRepository_1.DoctorRepository();
    }
    saveDoctor(doctor) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.doctorRepository.create(doctor);
        });
    }
    findDoctorById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.doctorRepository.findById(id);
        });
    }
    findDoctorByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.doctorRepository.findByEmail(email);
        });
    }
    findDoctorBySpeciality(speciality) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.doctorRepository.findBySpeciality(speciality);
        });
    }
    getDoctorStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.doctorRepository.getStatus(id);
        });
    }
    isDoctorVerified(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.doctorRepository.getIsVerified(id);
        });
    }
    getVerificationToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.doctorRepository.getVerificationToken(id);
        });
    }
    getAvailability(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.doctorRepository.getAvailability(id);
        });
    }
    getTimeSlots(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.doctorRepository.getTimeSlots(id);
        });
    }
    updateDoctor(id, updatePatient) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.doctorRepository.update(id, updatePatient);
        });
    }
    getAllDoctors() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.doctorRepository.getAll();
        });
    }
    deleteDoctor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.doctorRepository.delete(id);
        });
    }
}
exports.DoctorService = DoctorService;
//# sourceMappingURL=DoctorService.js.map
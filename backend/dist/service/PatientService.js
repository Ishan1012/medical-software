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
exports.PatientService = void 0;
const PatientRepository_1 = require("../repository/PatientRepository");
class PatientService {
    constructor() {
        this.patientRepository = new PatientRepository_1.PatientRepository();
    }
    savePatient(patient) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.patientRepository.create(patient);
        });
    }
    findPatientById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.patientRepository.findById(id);
        });
    }
    findPatientByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.patientRepository.findByEmail(email);
        });
    }
    getPatientStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.patientRepository.getStatus(id);
        });
    }
    isPatientVerified(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.patientRepository.getIsVerified(id);
        });
    }
    getVerificationToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.patientRepository.getVerificationToken(id);
        });
    }
    updatePatient(id, updatePatient) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.patientRepository.update(id, updatePatient);
        });
    }
    getAllPatients() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.patientRepository.getAll();
        });
    }
    deletePatient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.patientRepository.delete(id);
        });
    }
}
exports.PatientService = PatientService;
//# sourceMappingURL=PatientService.js.map
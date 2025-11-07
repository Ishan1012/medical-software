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
exports.ConsultService = void 0;
const mongoose_1 = require("mongoose");
const ConsultRepository_1 = require("../repository/ConsultRepository");
class ConsultService {
    constructor() {
        this.consultRepository = new ConsultRepository_1.ConsultRepository();
    }
    saveConsult(consult) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.consultRepository.create(consult);
        });
    }
    findConsultById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.consultRepository.findById(id);
        });
    }
    findConsultByPatientId(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const patientIdObj = new mongoose_1.Types.ObjectId(patientId);
            return yield this.consultRepository.findByPatientId(patientIdObj);
        });
    }
    getAllConsents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.consultRepository.getAll();
        });
    }
    deleteConsult(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consultRepository.delete(id);
        });
    }
}
exports.ConsultService = ConsultService;
//# sourceMappingURL=ConsultService.js.map
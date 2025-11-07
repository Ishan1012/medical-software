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
exports.deleteConsult = exports.getAllConsents = exports.findConsultPatientById = exports.findConsultById = exports.saveConsult = void 0;
const ConsultService_1 = require("../service/ConsultService");
const consultService = new ConsultService_1.ConsultService();
const saveConsult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consult = yield consultService.saveConsult(req.body);
        if (!consult) {
            return res.status(400).json({ success: false, message: "Unable to save the consult!" });
        }
        return res.status(201).json({ success: true, consult });
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
exports.saveConsult = saveConsult;
const findConsultById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(403).json({ success: false, message: "consult id is required!" });
        }
        const consult = yield consultService.findConsultById(id);
        if (!consult) {
            return res.status(400).json({ success: false, message: "Unable to find consult of given id!" });
        }
        return res.status(200).json({ success: true, consult });
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
exports.findConsultById = findConsultById;
const findConsultPatientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = req.params.patientId;
        if (!patientId) {
            return res.status(403).json({ success: false, message: "consult id is required!" });
        }
        const consults = yield consultService.findConsultByPatientId(patientId);
        if (!consults || consults.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find consults of given id!" });
        }
        return res.status(200).json({ success: true, consults });
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
exports.findConsultPatientById = findConsultPatientById;
const getAllConsents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consults = yield consultService.getAllConsents();
        if (!consults || consults.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find consults!" });
        }
        return res.status(200).json({ success: true, consults });
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
exports.getAllConsents = getAllConsents;
const deleteConsult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(403).json({ success: false, message: "consult id is required!" });
        }
        yield consultService.deleteConsult(id);
        return res.status(201).json({ success: true, message: "Consult deleted successfully" });
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
exports.deleteConsult = deleteConsult;
//# sourceMappingURL=ConsultController.js.map
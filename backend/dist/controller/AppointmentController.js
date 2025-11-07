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
exports.deleteAppointment = exports.getAllAppointments = exports.setStatusOfAppointment = exports.getStatusOfAppointment = exports.findAppointmentByDoctorId = exports.findAppointmentByPatientId = exports.findAppointmentById = exports.createAppointment = void 0;
const AppointmentService_1 = require("../service/AppointmentService");
const appointmentService = new AppointmentService_1.AppointmentService();
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield appointmentService.createAppointment(req.body);
        if (!appointment) {
            return res.status(400).json({ success: false, message: "Unable to create the appointment!" });
        }
        return res.status(201).json({ success: true, appointment });
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
exports.createAppointment = createAppointment;
const findAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(403).json({ success: false, message: "appointment id is required!" });
        }
        const appointment = yield appointmentService.findAppointmentById(id);
        if (!appointment) {
            return res.status(400).json({ success: false, message: "Unable to find the appointment!" });
        }
        return res.status(201).json({ success: true, appointment });
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
exports.findAppointmentById = findAppointmentById;
const findAppointmentByPatientId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = req.params.patientId;
        if (!patientId) {
            return res.status(403).json({ success: false, message: "patientId is required!" });
        }
        const appointments = yield appointmentService.findAppointmentByPatientId(patientId);
        if (!appointments || appointments.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find any appointments of given patient!" });
        }
        return res.status(201).json({ success: true, appointments });
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
exports.findAppointmentByPatientId = findAppointmentByPatientId;
const findAppointmentByDoctorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctorId = req.params.doctorId;
        if (!doctorId) {
            return res.status(403).json({ success: false, message: "doctorId is required!" });
        }
        const appointments = yield appointmentService.findAppointmentByDoctorId(doctorId);
        if (!appointments || appointments.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find any appointments of given doctor!" });
        }
        return res.status(201).json({ success: true, appointments });
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
exports.findAppointmentByDoctorId = findAppointmentByDoctorId;
const getStatusOfAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(403).json({ success: false, message: "appointment id is required!" });
        }
        const status = yield appointmentService.getStatusOfAppointment(id);
        if (!status) {
            return res.status(400).json({ success: false, message: "Unable to find the appointment!" });
        }
        return res.status(201).json({ success: true, status });
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
exports.getStatusOfAppointment = getStatusOfAppointment;
const setStatusOfAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const status = req.body.status;
        if (!id) {
            return res.status(403).json({ success: false, message: "appointment id is required!" });
        }
        const newAppointment = yield appointmentService.setStatusOfAppointment(id, status);
        if (!newAppointment) {
            return res.status(400).json({ success: false, message: "Unable to find the appointment!" });
        }
        return res.status(201).json({ success: true, appointment: newAppointment });
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
exports.setStatusOfAppointment = setStatusOfAppointment;
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield appointmentService.getAllAppointments();
        if (!appointments || appointments.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find the appointments!" });
        }
        return res.status(201).json({ success: true, appointments });
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
exports.getAllAppointments = getAllAppointments;
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(403).json({ success: false, message: "appointment id is required!" });
        }
        yield appointmentService.deleteAppointment(id);
        return res.status(201).json({ success: true, message: "Appointment deleted successfully" });
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
exports.deleteAppointment = deleteAppointment;
//# sourceMappingURL=AppointmentController.js.map
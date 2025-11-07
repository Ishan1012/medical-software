"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const AppointmentController_1 = require("../controller/AppointmentController");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.verifyToken, AppointmentController_1.createAppointment);
router.get('/:id', authMiddleware_1.verifyToken, AppointmentController_1.findAppointmentById);
router.get('/patient/:patientId', authMiddleware_1.verifyToken, AppointmentController_1.findAppointmentByPatientId);
router.get('/patient/:doctorId', authMiddleware_1.verifyToken, AppointmentController_1.findAppointmentByDoctorId);
router.get('/status/:id', authMiddleware_1.verifyToken, AppointmentController_1.getStatusOfAppointment);
router.put('/status/:id', authMiddleware_1.verifyToken, AppointmentController_1.setStatusOfAppointment);
router.get('/', authMiddleware_1.verifyToken, authMiddleware_1.requireAdmin, AppointmentController_1.getAllAppointments);
router.delete('/:id', authMiddleware_1.verifyToken, authMiddleware_1.requireAdminRoleOrDoctorRole, AppointmentController_1.deleteAppointment);
exports.default = router;
//# sourceMappingURL=AppointmentRoutes.js.map
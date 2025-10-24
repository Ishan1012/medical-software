import { Router } from "express";
import { requireAdmin, requireAdminRoleOrDoctorRole, verifyToken } from "../middleware/authMiddleware";
import { createAppointment, deleteAppointment, findAppointmentByDoctorId, findAppointmentById, findAppointmentByPatientId, getAllAppointments, getStatusOfAppointment, setStatusOfAppointment } from "../controller/AppointmentController";

const router = Router();

router.post('/', verifyToken, createAppointment);
router.get('/:id', verifyToken, findAppointmentById);
router.get('/patient/:patientId', verifyToken, findAppointmentByPatientId);
router.get('/patient/:doctorId', verifyToken, findAppointmentByDoctorId);
router.get('/status/:id', verifyToken, getStatusOfAppointment);
router.put('/status/:id', verifyToken, setStatusOfAppointment);
router.get('/', verifyToken, requireAdmin, getAllAppointments);
router.delete('/:id', verifyToken, requireAdminRoleOrDoctorRole, deleteAppointment);

export default router;
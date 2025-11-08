import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { getAllDoctors, getAvailabilityAndTimeSlots, getDoctorBySpecialty, isDoctorPhoneVerified, isDoctorVerified, updateDoctor } from "../controller/DoctorController";

const router = Router();

router.get('/:specialty', verifyToken, getDoctorBySpecialty);
router.get('/verified/:id', verifyToken, isDoctorVerified);
router.get('/verified/phone/:id', verifyToken, isDoctorPhoneVerified);
router.get('/available/:id', verifyToken, getAvailabilityAndTimeSlots);
router.put('/:id', verifyToken, updateDoctor);
router.get('/', verifyToken, getAllDoctors);

export default router;
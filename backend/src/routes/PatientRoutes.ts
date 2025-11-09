import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { getAllPatients, isPatientPhoneVerified, isPatientVerified, updatePatient } from "../controller/PatientController";

const router = Router();

router.get('/verified/:id', verifyToken, isPatientVerified);
router.get('/verified/phone/:id', verifyToken, isPatientPhoneVerified);
router.put('/', verifyToken, updatePatient);
router.get('/', verifyToken, getAllPatients);

export default router;
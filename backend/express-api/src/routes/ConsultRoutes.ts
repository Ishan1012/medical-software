import { Router } from "express";
import { requireAdmin, verifyToken } from "../middleware/authMiddleware";
import { deleteConsult, findConsultById, findConsultPatientById, getAllConsents, consult } from "../controller/ConsultController";

const router = Router();

router.post('/', verifyToken, consult);
router.get('/:id', verifyToken, findConsultById);
router.get('/patient/:patientId', verifyToken, findConsultPatientById);
router.get('/', verifyToken, requireAdmin, getAllConsents);
router.delete('/:id', verifyToken, deleteConsult);

export default router;
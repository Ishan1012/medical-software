import { Router } from "express";
import { requireAdmin, verifyToken } from "../middleware/authMiddleware";
import { deleteConsult, findConsultById, findConsultPatientById, getAllConsents, saveConsult } from "../controller/ConsultController";

const router = Router();

router.post('/', verifyToken, saveConsult);
router.get('/:id', verifyToken, findConsultById);
router.get('/patient/:patientId', verifyToken, findConsultPatientById);
router.get('/', verifyToken, requireAdmin, getAllConsents);
router.delete('/:id', verifyToken, deleteConsult);

export default router;
import { Router } from "express";
import { requireAdmin, verifyToken } from "../middleware/authMiddleware";
import { createFeedback, deleteFeedback, findFeedbackById, findFeedbackByPatientId, getAllFeedbacks } from "../controller/FeedbackController";

const router = Router();

router.post('/', verifyToken, createFeedback);
router.get('/:id', verifyToken, findFeedbackById);
router.get('/patient/:patientId', verifyToken, findFeedbackByPatientId);
router.get('/', verifyToken, requireAdmin, getAllFeedbacks);
router.delete('/:id', verifyToken, requireAdmin, deleteFeedback);

export default router;
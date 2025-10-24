import { Router } from "express";
import { me, signinPatient, signupPatient } from "../controller/AuthController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.post('/patient/signin', signinPatient);
router.post('/patient/signup', signupPatient);
router.get('/me', verifyToken, me);

export default router;
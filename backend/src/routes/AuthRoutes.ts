import { Router } from "express";
import { me, signinDoctor, signinPatient, signupDoctor, signupPatient } from "../controller/AuthController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.post('/patient/signup', signupPatient);
router.post('/doctor/signup', signupDoctor);
router.post('/patient/signin', signinPatient);
router.post('/doctor/signin', signinDoctor);
router.get('/me', verifyToken, me);

export default router;
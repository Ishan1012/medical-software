import { Router } from "express";
import { me, signin, signInByGoogle, signup } from "../controller/AuthController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signin/google', signInByGoogle);
router.get('/me', verifyToken, me);

export default router;
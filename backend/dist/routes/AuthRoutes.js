"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controller/AuthController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/signup', AuthController_1.signup);
router.post('/signin', AuthController_1.signin);
router.post('/signin/google', AuthController_1.signInByGoogle);
router.get('/me', authMiddleware_1.verifyToken, AuthController_1.me);
exports.default = router;
//# sourceMappingURL=AuthRoutes.js.map
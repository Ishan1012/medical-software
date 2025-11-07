"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const ConsultController_1 = require("../controller/ConsultController");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.verifyToken, ConsultController_1.saveConsult);
router.get('/:id', authMiddleware_1.verifyToken, ConsultController_1.findConsultById);
router.get('/patient/:patientId', authMiddleware_1.verifyToken, ConsultController_1.findConsultPatientById);
router.get('/', authMiddleware_1.verifyToken, authMiddleware_1.requireAdmin, ConsultController_1.getAllConsents);
router.delete('/:id', authMiddleware_1.verifyToken, ConsultController_1.deleteConsult);
exports.default = router;
//# sourceMappingURL=ConsultRoutes.js.map
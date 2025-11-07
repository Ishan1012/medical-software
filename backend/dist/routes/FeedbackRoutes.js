"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const FeedbackController_1 = require("../controller/FeedbackController");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.verifyToken, FeedbackController_1.createFeedback);
router.get('/:id', authMiddleware_1.verifyToken, FeedbackController_1.findFeedbackById);
router.get('/patient/:patientId', authMiddleware_1.verifyToken, FeedbackController_1.findFeedbackByPatientId);
router.get('/', authMiddleware_1.verifyToken, authMiddleware_1.requireAdmin, FeedbackController_1.getAllFeedbacks);
router.delete('/:id', authMiddleware_1.verifyToken, authMiddleware_1.requireAdmin, FeedbackController_1.deleteFeedback);
exports.default = router;
//# sourceMappingURL=FeedbackRoutes.js.map
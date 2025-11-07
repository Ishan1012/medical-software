"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const ArticleController_1 = require("../controller/ArticleController");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.verifyToken, ArticleController_1.createArticle);
router.get('/:id', authMiddleware_1.verifyToken, ArticleController_1.findArticleById);
router.get('/author/:id', authMiddleware_1.verifyToken, ArticleController_1.findArticlesByAuthor);
router.get('/category/:category', authMiddleware_1.verifyToken, ArticleController_1.findArticlesByCategory);
router.get('/keyword/:keyword', authMiddleware_1.verifyToken, ArticleController_1.findArticlesByKeyword);
router.put('/:id', authMiddleware_1.verifyToken, ArticleController_1.updateArticle);
router.get('/', authMiddleware_1.verifyToken, authMiddleware_1.requireAdmin, ArticleController_1.getAllArticles);
router.delete('/', authMiddleware_1.verifyToken, authMiddleware_1.requireAdminRoleOrDoctorRole, ArticleController_1.deleteArticle);
exports.default = router;
//# sourceMappingURL=ArticleRoutes.js.map
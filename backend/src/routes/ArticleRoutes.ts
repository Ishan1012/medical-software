import { Router } from "express";
import { requireAdmin, requireAdminRoleOrDoctorRole, verifyToken } from "../middleware/authMiddleware";
import { createArticle, deleteArticle, findArticleById, findArticlesByAuthor, findArticlesByCategory, findArticlesByKeyword, getAllArticles, updateArticle } from "../controller/ArticleController";

const router = Router();

router.post('/', verifyToken, createArticle);
router.get('/:id', verifyToken, findArticleById);
router.get('/author/:id', verifyToken, findArticlesByAuthor);
router.get('/category/:category', verifyToken, findArticlesByCategory);
router.get('/keyword/:keyword', verifyToken, findArticlesByKeyword);
router.put('/:id', verifyToken, updateArticle);
router.get('/', verifyToken, requireAdmin, getAllArticles);
router.delete('/', verifyToken, requireAdminRoleOrDoctorRole, deleteArticle);

export default router;
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.getAllArticles = exports.updateArticle = exports.findArticlesByKeyword = exports.findArticlesByCategory = exports.findArticlesByAuthor = exports.findArticleById = exports.createArticle = void 0;
const ArticleService_1 = require("../service/ArticleService");
const articleService = new ArticleService_1.ArticleService();
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield articleService.createArticle(req.body);
        if (!article) {
            return res.status(400).json({ success: false, message: "Unable to create the article!" });
        }
        return res.status(201).json({ success: true, article });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.createArticle = createArticle;
const findArticleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(403).json({ success: false, message: "article id is required!" });
        }
        const article = yield articleService.findArticleById(id);
        if (!article) {
            return res.status(400).json({ success: false, message: "Unable to find the article!" });
        }
        return res.status(201).json({ success: true, article });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.findArticleById = findArticleById;
const findArticlesByAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(403).json({ success: false, message: "article id is required!" });
        }
        const articles = yield articleService.findArticlesByAuthor(id);
        if (!articles || articles.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find any articles!" });
        }
        return res.status(201).json({ success: true, articles });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.findArticlesByAuthor = findArticlesByAuthor;
const findArticlesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.category;
        if (!category) {
            return res.status(403).json({ success: false, message: "category is required!" });
        }
        const articles = yield articleService.findArticlesByCategory(category);
        if (!articles || articles.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find any articles!" });
        }
        return res.status(201).json({ success: true, articles });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.findArticlesByCategory = findArticlesByCategory;
const findArticlesByKeyword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keyword = req.params.keyword;
        if (!keyword) {
            return res.status(403).json({ success: false, message: "keyword is required!" });
        }
        const articles = yield articleService.findArticleByKeyword(keyword);
        if (!articles || articles.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find any articles!" });
        }
        return res.status(201).json({ success: true, articles });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.findArticlesByKeyword = findArticlesByKeyword;
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updateArticle = req.body;
        if (!id || !updateArticle) {
            return res.status(403).json({ success: false, message: "id and updateArticle is required!" });
        }
        const article = articleService.updateArticle(id, updateArticle);
        if (!article) {
            return res.status(400).json({ success: false, message: "Unable to find the article!" });
        }
        return res.status(201).json({ success: true, article });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.updateArticle = updateArticle;
const getAllArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield articleService.getAllArticles();
        if (!articles || articles.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find the articles!" });
        }
        return res.status(201).json({ success: true, articles });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.getAllArticles = getAllArticles;
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(403).json({ success: false, message: "id is required!" });
        }
        yield articleService.deleteArticle(id);
        return res.status(201).json({ success: true, message: "Article deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        }
        else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
});
exports.deleteArticle = deleteArticle;
//# sourceMappingURL=ArticleController.js.map
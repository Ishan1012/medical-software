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
exports.ArticleService = void 0;
const mongoose_1 = require("mongoose");
const ArticleRepository_1 = require("../repository/ArticleRepository");
class ArticleService {
    constructor() {
        this.articleRepository = new ArticleRepository_1.ArticleRepository();
    }
    createArticle(article) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articleRepository.create(article);
        });
    }
    findArticleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articleRepository.findById(id);
        });
    }
    findArticlesByAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorObj = new mongoose_1.Types.ObjectId(author);
            return yield this.articleRepository.findByAuthor(authorObj);
        });
    }
    findArticlesByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articleRepository.findByCategory(category);
        });
    }
    findArticleByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articleRepository.findByKeyword(keyword);
        });
    }
    updateArticle(id, updateArticle) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articleRepository.update(id, updateArticle);
        });
    }
    getAllArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articleRepository.getAll();
        });
    }
    deleteArticle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.articleRepository.delete(id);
        });
    }
}
exports.ArticleService = ArticleService;
//# sourceMappingURL=ArticleService.js.map
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleRepository = void 0;
const Article_1 = __importDefault(require("../model/Article"));
class ArticleRepository {
    create(article) {
        return __awaiter(this, void 0, void 0, function* () {
            const newArticle = new Article_1.default(article);
            return yield newArticle.save();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Article_1.default.findOne({ id }).exec();
        });
    }
    findByAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Article_1.default.find({ author }).sort({ createdAt: -1 }).exec();
        });
    }
    findByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Article_1.default.find({ category }).sort({ createdAt: -1 }).exec();
        });
    }
    findByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Article_1.default.find({
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { excerpt: { $regex: keyword, $options: 'i' } }
                ]
            }).sort({ createdAt: -1 }).exec();
        });
    }
    update(id, updatedArticle) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Article_1.default.findOneAndUpdate({ id }, { updatedArticle }, { new: true, runValidators: true }).exec();
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Article_1.default.find().sort({ createdAt: -1 }).exec();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Article_1.default.findOneAndDelete({ id });
        });
    }
}
exports.ArticleRepository = ArticleRepository;
//# sourceMappingURL=ArticleRepository.js.map
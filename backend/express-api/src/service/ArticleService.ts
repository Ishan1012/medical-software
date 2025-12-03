import { Types } from "mongoose";
import { IArticle } from "../interface/IArticle";
import { ArticleRepository } from "../repository/ArticleRepository";

export class ArticleService {
    private articleRepository: ArticleRepository;

    constructor() {
        this.articleRepository = new ArticleRepository();
    }

    async createArticle(article: IArticle): Promise<IArticle | null> {
        return await this.articleRepository.create(article);
    }

    async findArticleById(id: string): Promise<IArticle | null> {
        return await this.articleRepository.findById(id);
    }

    async findArticlesByAuthor(author: string): Promise<IArticle[]> {
        const authorObj = new Types.ObjectId(author);
        return await this.articleRepository.findByAuthor(authorObj);
    }

    async findArticlesByCategory(category: string): Promise<IArticle[]> {
        return await this.articleRepository.findByCategory(category);
    }

    async findArticleByKeyword(keyword: string): Promise<IArticle[]> {
        return await this.articleRepository.findByKeyword(keyword);
    }

    async updateArticle(id: string, updateArticle: Partial<IArticle>): Promise<IArticle | null> {
        return await this.articleRepository.update(id, updateArticle);
    }

    async getAllArticles(): Promise<IArticle[]> {
        return await this.articleRepository.getAll();
    }

    async deleteArticle(id: string): Promise<void> {
        await this.articleRepository.delete(id);
    }
}
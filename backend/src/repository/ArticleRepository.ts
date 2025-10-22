import { Types } from "mongoose";
import { IArticle } from "../interface/IArticle";
import Article from "../model/Article";

export class ArticleRepository {
    async create(article: Partial<IArticle>): Promise<IArticle | null> {
        const newArticle = new Article(article);
        return await newArticle.save();
    }

    async findById(id: string): Promise<IArticle | null> {
        return await Article.findOne({ id }).exec();
    }

    async findByAuthor(author: string): Promise<IArticle[]> {
        return await Article.find({ author }).exec();
    }

    async findByCategory(category: string): Promise<IArticle[]> {
        return await Article.find({ category }).exec();
    }

    async findByTitle(title: string): Promise<IArticle | null> {
        return await Article.findOne({ title }).exec();
    }

    async update(id: string, updatedArticle: Partial<IArticle | null>): Promise<IArticle | null> {
        return await Article.findOneAndUpdate({ id }, { updatedArticle }, { new: true }).exec();
    }

    async getAll(): Promise<IArticle[]> {
        return await Article.find().exec();
    }

    async delete(id: string): Promise<void> {
        await Article.findOneAndDelete({ id });
    }
}
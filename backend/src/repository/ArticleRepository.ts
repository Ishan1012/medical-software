import { Types } from "mongoose";
import { IArticle } from "../interface/IArticle";
import Article from "../model/Article";

export class ArticleRepository {
    async create(article: IArticle): Promise<IArticle | null> {
        const newArticle = new Article(article);
        return await newArticle.save();
    }

    async findById(id: string): Promise<IArticle | null> {
        return await Article.findOne({ id }).exec();
    }

    async findByAuthor(author: Types.ObjectId): Promise<IArticle[]> {
        return await Article.find({ author }).sort({ createdAt: -1 }).exec();
    }

    async findByCategory(category: string): Promise<IArticle[]> {
        return await Article.find({ category }).sort({ createdAt: -1 }).exec();
    }

    async findByKeyword(keyword: string): Promise<IArticle[]> {
        return await Article.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { excerpt: { $regex: keyword, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 }).exec();
    }

    async update(id: string, updatedArticle: Partial<IArticle>): Promise<IArticle | null> {
        return await Article.findOneAndUpdate({ id }, { updatedArticle }, { new: true, runValidators: true }).exec();
    }

    async getAll(): Promise<IArticle[]> {
        return await Article.find().sort({ createdAt: -1 }).exec();
    }

    async delete(id: string): Promise<void> {
        await Article.findOneAndDelete({ id });
    }
}
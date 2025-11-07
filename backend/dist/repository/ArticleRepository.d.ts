import { Types } from "mongoose";
import { IArticle } from "../interface/IArticle";
export declare class ArticleRepository {
    create(article: IArticle): Promise<IArticle | null>;
    findById(id: string): Promise<IArticle | null>;
    findByAuthor(author: Types.ObjectId): Promise<IArticle[]>;
    findByCategory(category: string): Promise<IArticle[]>;
    findByKeyword(keyword: string): Promise<IArticle[]>;
    update(id: string, updatedArticle: Partial<IArticle>): Promise<IArticle | null>;
    getAll(): Promise<IArticle[]>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=ArticleRepository.d.ts.map
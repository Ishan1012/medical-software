import { IArticle } from "../interface/IArticle";
export declare class ArticleService {
    private articleRepository;
    constructor();
    createArticle(article: IArticle): Promise<IArticle | null>;
    findArticleById(id: string): Promise<IArticle | null>;
    findArticlesByAuthor(author: string): Promise<IArticle[]>;
    findArticlesByCategory(category: string): Promise<IArticle[]>;
    findArticleByKeyword(keyword: string): Promise<IArticle[]>;
    updateArticle(id: string, updateArticle: Partial<IArticle>): Promise<IArticle | null>;
    getAllArticles(): Promise<IArticle[]>;
    deleteArticle(id: string): Promise<void>;
}
//# sourceMappingURL=ArticleService.d.ts.map
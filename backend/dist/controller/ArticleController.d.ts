import { Request, Response } from "express";
export declare const createArticle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const findArticleById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const findArticlesByAuthor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const findArticlesByCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const findArticlesByKeyword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateArticle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllArticles: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteArticle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=ArticleController.d.ts.map
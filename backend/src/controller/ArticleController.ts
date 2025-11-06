import { Request, Response } from "express";
import { ArticleService } from "../service/ArticleService";

const articleService: ArticleService = new ArticleService();

export const createArticle = async (req: Request, res: Response) => {
    try {
        const article = await articleService.createArticle(req.body);

        if(!article) {
            return res.status(400).json({ success: false, message: "Unable to create the article!" });
        }

        return res.status(201).json({ success: true, article });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const findArticleById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(403).json({ success: false, message: "article id is required!" });
        }

        const article = await articleService.findArticleById(id);

        if(!article) {
            return res.status(400).json({ success: false, message: "Unable to find the article!" });
        }

        return res.status(201).json({ success: true, article });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const findArticlesByAuthor = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(403).json({ success: false, message: "article id is required!" });
        }

        const articles = await articleService.findArticlesByAuthor(id);

        if(!articles || articles.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find any articles!" });
        }

        return res.status(201).json({ success: true, articles });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const findArticlesByCategory = async (req: Request, res: Response) => {
    try {
        const category = req.params.category;

        if(!category) {
            return res.status(403).json({ success: false, message: "category is required!" });
        }

        const articles = await articleService.findArticlesByCategory(category);

        if(!articles || articles.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find any articles!" });
        }

        return res.status(201).json({ success: true, articles });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const findArticlesByKeyword = async (req: Request, res: Response) => {
    try {
        const keyword = req.params.keyword;

        if(!keyword) {
            return res.status(403).json({ success: false, message: "keyword is required!" });
        }

        const articles = await articleService.findArticleByKeyword(keyword);

        if(!articles || articles.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find any articles!" });
        }

        return res.status(201).json({ success: true, articles });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const updateArticle = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updateArticle = req.body;

        if(!id || !updateArticle) {
            return res.status(403).json({ success: false, message: "id and updateArticle is required!" });
        }

        const article = articleService.updateArticle(id, updateArticle);

        if(!article) {
            return res.status(400).json({ success: false, message: "Unable to find the article!" });
        }

        return res.status(201).json({ success: true, article });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const getAllArticles = async (req: Request, res: Response) => {
    try {
        const articles = await articleService.getAllArticles();

        if(!articles || articles.length === 0) {
            return res.status(400).json({ success: false, message: "Unable to find the articles!" });
        }

        return res.status(201).json({ success: true, articles });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}

export const deleteArticle = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        if(!id) {
            return res.status(403).json({ success: false, message: "id is required!" });
        }

        await articleService.deleteArticle(id);

        return res.status(201).json({ success: true, message: "Article deleted successfully" });
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
        } else {
            return res.status(500).json({ success: false, message: "Internal server error", error: String(error) });
        }
    }
}
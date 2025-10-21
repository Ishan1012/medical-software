import { Document, Types } from "mongoose";

export interface IArticle extends Document {
    title: string;
    excerpt: string;
    imgUrl?: string;
    category?: string;
    author?: Types.ObjectId;
    readTime: number;
    createdAt: Date;
    updatedAt: Date;
}
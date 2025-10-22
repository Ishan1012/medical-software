import { model, Schema, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IArticle } from "../interface/IArticle";
import { truncate } from 'fs';

const articleSchema = new Schema<IArticle>({
  id: {
    type: String,
    default: () => "ART" + uuidv4().replace(/-/g, "").slice(0, 10),
    unique: true
  },
  title: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  imgUrl: { type: String, required: false },
  category: { type: String, required: false },
  author: { type: Schema.Types.ObjectId, ref: 'Doctor' },
  readTime: { type: Number, default: 0 }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

articleSchema.pre('save', function (next) {
  if (this.excerpt) {
    const wordsPerMinute = 200; // avg reading speed
    const words = this.excerpt.split(/\s+/).length;
    this.readTime = Math.ceil(words / wordsPerMinute);
  }
  next();
});

const Article = model<IArticle>('Article', articleSchema);

export default Article;
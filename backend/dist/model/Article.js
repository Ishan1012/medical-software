"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const articleSchema = new mongoose_1.Schema({
    id: {
        type: String,
        default: () => "ART" + (0, uuid_1.v4)().replace(/-/g, "").slice(0, 10),
        unique: true
    },
    title: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    imgUrl: { type: String, required: false },
    category: { type: String, required: false },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Doctor' },
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
const Article = (0, mongoose_1.model)('Article', articleSchema);
exports.default = Article;
//# sourceMappingURL=Article.js.map
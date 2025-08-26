const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const ArticleSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    img: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: function (value) {
                return typeof value === 'string' || Buffer.isBuffer(value);
            },
            message: 'img must be a string or a Buffer',
        },
    },
    category: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    readTime: { type: Number, default: 0 }
})

ArticleSchema.pre('save', function (next) {
  if (this.excerpt) {
    const wordsPerMinute = 200; // avg reading speed
    const words = this.excerpt.split(/\s+/).length;
    this.readTime = Math.ceil(words / wordsPerMinute);
  }
  next();
});
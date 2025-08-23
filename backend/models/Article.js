const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const ArticleSechma = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    title: { type: String, required: true}
})
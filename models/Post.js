const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    author: String,
    body: String,
    status: { type: String, default: "published" },
    votes: { type: String, default: 0 },
    category: { type: String, default: "all" },
    community: String,
    voters: Array,
    comments: Array,
});

module.exports = mongoose.model('Post', PostSchema);
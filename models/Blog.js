const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        default: Date.now
    },
  
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
},
{ timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = {Blog};

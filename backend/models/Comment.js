const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    commenter: String,
    comment: String,
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };

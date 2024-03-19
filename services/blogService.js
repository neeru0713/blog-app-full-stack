const { Blog } = require("../models/Blog.js");
const { Comment } = require("../models/Comment.js");

async function createBlog(body) {
  //   console.log("User body: ", userBody);

  try {
    const newBlog = new Blog(body);
    const result = await newBlog.save();
    return result;
  } catch (error) {
    console.error("Error creating movie: ", error.message);
    throw error;
  }
}

const getBlog = async (blogId) => {
  try {
    let blog;
    // Show comments under each blog post - using populate method
    if (blogId) {
      blog = await Blog.findOne({ _id: blogId }).populate("comments");
    } else {
      blog = await Blog.find().populate("comments");
    }
    return blog;
  } catch (error) {
    console.error("Error getting blog: ", error.message);
  }
};

const updateBlog = async (blogId, body) => {
    try {
      const updateBlog = await Blog.findByIdAndUpdate(blogId, body, {
        new: true,
      });
      return updateBlog;
    } catch (error) {
      console.error("Error updating blog: ", error.message);
    }
  };
  
  const deleteBlog = async (blogId) => {
    try {
      console.log("oihi", blogId);
      const deleteBlog = await Blog.findByIdAndDelete(blogId);
      return deleteBlog;
    } catch (error) {
      console.error("Error deleting blog: ", error.message);
    }
  };

  const createComment = async (blogId, commentBody) => {
    try {
      console.log(blogId, commentBody);
      const blog = await Blog.findOne({ _id: blogId });
      const newComment = new Comment(commentBody);
      const comment = await newComment.save();
      blog.comments.push(comment);
      await blog.save();
      return comment;
    } catch (error) {
      console.error("Error creating Comment : ", error.message);
    }
  };
module.exports = {
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog,
  createComment
};

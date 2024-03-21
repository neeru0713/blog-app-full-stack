const { Blog } = require("../models/Blog.js");
const blogService = require("../services/blogService.js");

const createBlog = async (req, res) => {
  try {
    let newBlog = await blogService.createBlog(req.body);
    if (newBlog) {
      res.status(201).json({ blog: newBlog });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBlog = async (req, res) => {
    try {
    
     let blog = await blogService.getBlog(req.params.id);
      if (blog) {
        return res.status(200).json({ blog });
      }
      if (!blog) {
        return res.status(404).json({ message: "blog not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const deleteBlog = async (req, res) => {
    try {
      let deleteBlog = await blogService.deleteBlog(req.params.id);
      if (!deleteBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      if (deleteBlog) {
        res.status(200).json({ delete: deleteBlog });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const updateBlog = async (req, res) => {
    try {
      let updateBlog = await blogService.updateBlog(req.params.id, req.body);
      if (updateBlog) {
        res.status(201).json({ blog: updateBlog });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  const createComment = async (req, res) => {
    try {
      let comment = await blogService.createComment(req.params.id, req.body);
      if (comment) {
        return res.status(200).json({ comment });
      }
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };






module.exports = {
    createBlog,
    getBlog,
    deleteBlog,
    updateBlog,
    createComment
};

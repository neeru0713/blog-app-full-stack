const { Blog } = require("../models/Blog");
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











module.exports = {
    createBlog,
    getBlog
};

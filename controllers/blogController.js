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













module.exports = {
    createBlog,
 
};

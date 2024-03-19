const { Blog } = require("../models/Blog.js");

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
    if (blogId) {
      blog = await Blog.findOne({ _id: blogId });
    } else {
      blog = await Blog.find();
    }
    return blog;
  } catch (error) {
    console.error("Error getting blog: ", error.message);
  }
};
module.exports = {
  createBlog,
  getBlog,
};

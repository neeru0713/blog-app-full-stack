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
module.exports = {
    createBlog,
};
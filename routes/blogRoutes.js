// authRoutes.js
const express = require("express");
const blogController = require("../controllers/blogController");
const authenticateMiddleware = require("../middleware/authenticateToken")
const router = express.Router();

router.post(
  "/",
  authenticateMiddleware,
  blogController.createBlog
);







module.exports = router;

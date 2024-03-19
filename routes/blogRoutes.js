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

router.get(
    "/:id?",
    blogController.getBlog
  );
  
  router.delete(
    "/:id",
    authenticateMiddleware,
    blogController.deleteBlog
  );
  
  router.put(
    "/:id",
    authenticateMiddleware,
    blogController.updateBlog
  )



module.exports = router;

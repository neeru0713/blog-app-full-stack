// authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/authController");
const router = express.Router();

const SECRET_KEY = "blog_app_full_stack"; 

router.post("/login", authController.login);

router.post(
  "/register",
  authController.register
);

module.exports = router;

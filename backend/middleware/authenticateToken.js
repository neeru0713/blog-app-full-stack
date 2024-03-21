// authMiddleware.js

const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const authenticateMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token)

    const decoded = jwt.verify(token, "taskmanagementsecret");
    console.log(decoded)

    const user = await User.findOne({ _id: decoded._id });
    console.log(user)

    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed" });
  }
};

module.exports = authenticateMiddleware;

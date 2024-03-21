const { User } = require("../models/User.js");
const jwt = require("jsonwebtoken");


async function createUser(userBody) {
  console.log("User body: ", userBody);

  try {
    let userExists = await User.findOne({ email: userBody.email });
    if (userExists) {
      // Handle case where email already exists
      throw new Error("Email already taken");
    } else {
      const newUser = new User(userBody);
      
      const result = await newUser.save();
      return result;
    }
  } catch (error) {
    console.error("Error creating user: ", error.message);
    throw error;
  }
}


const generateToken = (userId, secret = "taskmanagementsecret") => {
  const payload = { _id: userId.toString()};
  const token = jwt.sign(payload, secret);
  return token;
};

const generateAuthTokens = async (user) => {
  
  let token = generateToken(user?._id);
  let obj = {
    access: {
      token: token
    },
  };

  return obj;
};

const getUserByEmail = async (email) => {
    return await User.findOne({ email: email });
  }

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await getUserByEmail(email);

  if (!user) {
    // throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
    return;
  }

  const isMatching = await user.isPasswordMatch(password);

  if (!isMatching) {
    // throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
    return;
  }

  return user;
};

module.exports = {
  createUser,
  generateAuthTokens,
  loginUserWithEmailAndPassword,
  
};

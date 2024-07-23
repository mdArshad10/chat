import { User } from "../models/User.js";
import { AsyncHandler } from "../middlewares/AsyncHandler.js";
import { ErrorHandler } from "../utils/error.js";

// cookie options
const cookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 3,
  secure: true,
  sameSite: "None",
  httpOnly: true,
};

// TODO: for testing the get in frontend
// @DESC: get all users
// @METHOD: [GET]      api/v1/all
// @ACCESS: public
const getAllUsers = AsyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.cookie("token", "this is for token", cookieOptions).status(200).json({
    success: true,
    message: "get all users",
    data: users,
  });
});

// @DESC: create a new user
// @METHOD: [POST]      api/v1/signup
// @ACCESS: public
const signupUser = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("plz fill all the felid", 400));
  }
  const existUser = await User.findOne({ email });
  if (existUser) {
    return next(new ErrorHandler("user already exist", 400));
  }

  const user = await User.create({
    email,
    password,
  });

  const token = await user.generateToken();

  res
    .cookie("token", token, cookieOptions)
    .status(200)
    .json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        profileSetup: user.profileSetup,
      },
    });
});

// @DESC: login the user
// @METHOD: [POST]      api/v1/login
// @ACCESS: public
const loginUser = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("plz fill all the felid", 400));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Invalid email", 404));
  }
  const isPasswordMatch = await user.getPassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid password", 404));
  }

  const token = await user.generateToken();

  const userWithOutPassword = await User.findById(user._id).select("-password");

  res.cookie("token", token, cookieOptions).status(200).json({
    success: true,
    message: "User login successfully",
    data: userWithOutPassword,
  });
});

// @DESC: logout the user
// @METHOD: [POST]      api/v1/logout
// @ACCESS: private
const logOutUser = AsyncHandler(async (req, res, next) => {
  res.cookie("token", "", cookieOptions).status(200).json({
    success: true,
    message: "User logged out successfully",
    user: null,
  });
});

// @DESC: get loggedIn user details
// @METHOD: [GET]      api/v1/user-info
// @ACCESS: private
const getUserInfo = AsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "get User details",
    user,
  });
});

// @DESC: update the loggedIn user details
// @METHOD: [PUT]      api/v1/update-profile
// @ACCESS: private
const updateProfile = AsyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
});

// @DESC: add the profile pic into loggedIn user
// @METHOD: [POST]      api/v1/add-profile-image
// @ACCESS: private
const addProfileImage = AsyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Profile image added successfully",
  });
});

// @DESC: get loggedIn user details
// @METHOD: [DELETE]      api/v1/remove-profile-image
// @ACCESS: private
const removeProfileImage = AsyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Profile image removed successfully",
  });
});

export {
  signupUser,
  getAllUsers,
  loginUser,
  getUserInfo,
  logOutUser,
  updateProfile,
  addProfileImage,
  removeProfileImage,
};

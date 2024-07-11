import { User } from "../models/User.js";
import { AsyncHandler } from "../middlewares/AsyncHandler.js";
import { ErrorHandler } from "../utils/error.js";

// cookie options
const cookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 3,
  secure: true,
  sameSite: "None",
};

// @DESC: create a new user
// @METHOD: [POST]      api/v1/signup
// @ACCESS: public
const signupUser = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("plz fill all the felid", 400));
  }
  const existUser = await User.find({ email });
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
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profileSetup: user.profileSetup,
      },
    });
});

// // @DESC: login the user
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

  res.cookie("token", token, cookieOptions).status(200).json({
    success: true,
    message: "User login successfully",
    user,
  });
});

export { signupUser, loginUser };

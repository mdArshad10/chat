import { User } from "../models/User.js";
import { AsyncHandler } from "../middlewares/AsyncHandler.js";
import { ErrorHandler } from "../utils/error.js";

// @DESC: create a new user
// @METHOD: [POST]      api/v1/signup
// @ACCESS: public

const cookie = {
  maxAge:,

}

const signUp = AsyncHandler(async (req, res, next) => {
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

  res.cookie('token', token, ).status(200).json({
    success: true,
    message: "User registered successfully",
  });
});

export { signUp };

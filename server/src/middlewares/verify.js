import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/error.js";
import { jwtSecret } from "../constant.js";

import { User } from "../models/User.js";

const ProtectedUser = async (req, res, next) => {
  const token =
    req.cookies?.token || req.headers["authorization"].split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("Token not provided", 404));
  }
  try {
    const decode = jwt.verify(token, jwtSecret);
    const user = await User.findById(decode.id).select("-password");
    if (!user) {
      return next(new ErrorHandler("invalid token", 400));
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return next(new ErrorHandler(error.message, 400));
  }
};

export { ProtectedUser };

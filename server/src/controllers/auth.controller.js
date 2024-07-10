import { User } from "../models/User.js";
import { AsyncHandler } from "../middlewares/AsyncHandler.js";
// @DESC:
// @METHOD:
// @ACCESS:
const signUp = AsyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "User registered successfully",
  });
});

export { signUp };

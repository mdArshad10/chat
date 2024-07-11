import { User } from "../models/User.js";
import { AsyncHandler } from "../middlewares/AsyncHandler.js";
import { ErrorHandler } from "../utils/error.js";

// @DESC: for searching the contact
// @METHOD: [GET]      api/v1/
// @ACCESS: private
const searchContact = AsyncHandler(async (req, res, next) => {
  const { searchTerm } = req.body;
  if (!searchTerm) {
    return next(new ErrorHandler("Search term is required", 400));
  }
  const senitizedSearchTerm = searchTerm.replace(/[.*+?^${}|[\]\\]/g, "\\$&");
  const regex = new RegExp(senitizedSearchTerm, "i");

  const contacts = await User.find({
    $and: [
      { _id: req.user._id },
      {
        $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
      },
    ],
  });

  res
    .status(200)
    .json({ success: true, message: "get the correct the term", contacts });
});

export { searchContact };

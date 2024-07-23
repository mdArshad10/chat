import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
import { jwtSecret } from "../constant.js";
import Joi from "joi";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    image: {
      public_id: String,
      url: String,
    },
    color: {
      type: Number,
    },
    profileSetup: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// middleware to save the password into encrypt form
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

// get the descrypt password
userSchema.methods.getPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// generate the token
userSchema.methods.generateToken = async function () {
  return await jwt.sign({ id: this._id, email: this.email }, jwtSecret, {
    expiresIn: "1d",
  });
};

export const User = model("User", userSchema);

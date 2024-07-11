import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
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
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    image: {
      public_id: String,
      url: String,
    },
    color: {
      type: Number,
      required: false,
    },
    profileSetup: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

async function signUpValidation(data) {
  try {
    const signUpSchemaJoi = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      profileSetup: Joi.boolean().default(false),
    });
  } catch (error) {}
}

// middleware to save the password into encrypt form
userSchema.pre("save", async function () {
  if (!userSchema.isModified("password")) return;
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

// get the descrypt password
userSchema.methods.getPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// generate the token
userSchema.methods.generateToken = async function () {
  return await jwt.sign(
    { id: this._id, email: this.email },
    process.env.TOKEN_SECRET_KEY,
    {
      expiresIn: "1d",
      maxAge: 1000 * 60 * 60 * 24,
    }
  );
};

export const User = model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a email"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a strong password"],
  },
  isVerfied: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// if it is allready in mongo use that or make a new one
export const User = mongoose.models.users ||  mongoose.model("users", userSchema);

import { hash } from "bcrypt";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res) => {};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid Email or Password", 400));
  }

  sendCookie(user, res, `Welcome back ${user.name}`, 200);
};

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User Already Exits", 400));
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashedPassword });

  sendCookie(user, res, "Register Successfully", 201);
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      user: req.user,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    });
};

// update user
// export const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id);
//   res.json({
//     success: true,
//     message: "Updated",
//   });
// };

// deleteUser
// export const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   const user = await User.findById(id);
//   res.json({
//     success: true,
//     message: "Deleted"
//   });
// };

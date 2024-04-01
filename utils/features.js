import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, satusCode) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  console.log(process.env.NODE_ENV)
      console.log(process.env.NODE_ENV === "DEVELOPMENT")
  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
      secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};

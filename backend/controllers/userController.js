import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
      role: "user",
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser, res);
      res.status(200).json({
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log("Error in creating user", error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });
    generateToken(user, res);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error in Login controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export function logoutUser(req, res) {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

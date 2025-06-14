import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already used" });

    const user = await User.create({ email, password });
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({
      _id: user._id,
      email: user.email,
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const googleAuth = async (req, res) => {
  const { email, googleId } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email, googleId });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ error: "Google auth failed" });
  }
};

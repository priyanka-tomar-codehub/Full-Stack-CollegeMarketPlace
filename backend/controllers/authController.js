import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ➤ Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Allow only Amity emails
    if (!email.toLowerCase().endsWith("@amity.edu")) {
     return res.status(400).json({
     message: "Only Amity students can register"
   });
   }

    // Check user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log("BODY:", req.body);
  }
};

// ➤ Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Allow only Amity emails
  if (!email.toLowerCase().endsWith("@amity.edu")) {
    return res.status(400).json({
    message: "Only Amity students can register"
  });
  }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
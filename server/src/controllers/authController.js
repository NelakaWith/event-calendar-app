// server/src/controllers/authController.js
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { createTokens, validateToken } from "../middleware/jwt.middleware.js";

/**
 * Register a new user.
 * Expects email, name, and password in the request body.
 * Checks for existing email, hashes password, and creates user.
 * Responds with the new user's id, email, and name.
 */
export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already registered." });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, name, password: hash });
    res.status(201).json({
      message: "Registration successful",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed.", error: err.message });
  }
};

/**
 * Log in a user.
 * Expects email and password in the request body.
 * Verifies credentials, generates JWT, and sets it as an HTTP-only cookie.
 * Supports 'keepLoggedIn' for longer session duration.
 * Responds with user id, email, and name if successful.
 */
export const login = async (req, res) => {
  try {
    const { email, password, keepLoggedIn } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required." });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    // Use createTokens to generate JWT and set as cookie
    const token = createTokens({ userId: user.email, id: user.id });
    res.cookie("access-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Required for cross-site cookies
      maxAge: keepLoggedIn ? 30 * 24 * 60 * 60 * 1000 : 120 * 60 * 1000,
    });
    res.json({
      message: "Login successful",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed.", error: err.message });
  }
};

/**
 * Log out the current user.
 * Clears the access-token cookie.
 * Responds with a success message.
 */
export const logout = (req, res) => {
  res.clearCookie("access-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.json({ message: "Logged out successfully" });
};

/**
 * Get details of the currently authenticated user.
 * Requires a valid JWT (validateToken middleware).
 * Responds with user id, email, name, role, and created_at if found.
 */
export const getUserDetails = [
  validateToken,
  async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const user = await User.findByPk(userId, {
        attributes: ["id", "email", "name", "role", "created_at"],
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ user });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to fetch user details", error: err.message });
    }
  },
];

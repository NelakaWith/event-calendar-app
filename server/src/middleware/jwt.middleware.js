import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const createTokens = (user) => {
  return jwt.sign({ username: user.userId, id: user.id }, JWT_SECRET);
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) return res.status(401).json({ error: "Unauthorized" });
  try {
    const validToken = jwt.verify(accessToken, JWT_SECRET);
    if (validToken) {
      req.authenticated = true;
      req.user = validToken;
      return next();
    }
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export { createTokens, validateToken };

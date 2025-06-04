import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET_CURRENT =
  process.env.JWT_SECRET_CURRENT || process.env.JWT_SECRET;
const JWT_SECRET_PREVIOUS = process.env.JWT_SECRET_PREVIOUS;

const createTokens = (user) => {
  return jwt.sign({ username: user.userId, id: user.id }, JWT_SECRET_CURRENT);
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) return res.status(401).json({ error: "Unauthorized" });
  try {
    req.user = jwt.verify(accessToken, JWT_SECRET_CURRENT);
    req.authenticated = true;
    return next();
  } catch (err) {
    // Try previous secret if available
    if (JWT_SECRET_PREVIOUS) {
      try {
        req.user = jwt.verify(accessToken, JWT_SECRET_PREVIOUS);
        req.authenticated = true;
        return next();
      } catch (err2) {
        // fall through
      }
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};

export { createTokens, validateToken };

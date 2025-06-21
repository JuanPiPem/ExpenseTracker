import admin from "../firebase/admin.js";

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default authenticateToken;

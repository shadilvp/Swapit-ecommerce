import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const JWT_SECRET = process.env.TOKEN_SECRET

export const verifyAccessToken = (req, res, next) => {
    const {accessToken} = req.cookies
    // console.log("accessToken",accessToken)
    if (!accessToken) return res.status(401).json({ message: "Access Denied! there is no token" });

    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        // console.log(decoded);
        
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
};


export const optionalAuth = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Optional auth failed:", error.message);
    req.user = null; 
    next();
  }
};

import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.TOKEN_SECRET

export const verifyAccessToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied! there is no token" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

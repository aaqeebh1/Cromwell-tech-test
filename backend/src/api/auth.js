import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => { 
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res
          .status(401)
          .json({ message: "Token is not valid (format: Bearer <token>)" });
    }
    const token = tokenParts[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ message: "Token is not valid" });
    }
}

export default authMiddleware;
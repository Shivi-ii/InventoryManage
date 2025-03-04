const jwt = require("jsonwebtoken");
const JWT_SECRET = 'ggjySDDG';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization; // No need for split
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to request object

        next(); // Proceed to the next middleware or route
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;

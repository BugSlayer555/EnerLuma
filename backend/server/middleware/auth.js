import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "enerluma-dev-secret-change-me";

/**
 * Generate a signed JWT for a user.
 */
export function signToken(user) {
    return jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        JWT_SECRET,
        { expiresIn: "7d" }
    );
}

/**
 * Express middleware: verify JWT from Authorization header.
 * Attaches `req.user` on success.
 */
export function requireAuth(req, res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authentication required" });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

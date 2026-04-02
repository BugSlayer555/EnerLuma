import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "../utils/apiError.js";

export function signToken(user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role || "user",
        },
        env.jwtSecret,
        { expiresIn: env.jwtExpiresIn }
    );
}

export function requireAuth(req, _res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return next(new ApiError(401, "Authentication required"));
    }

    const token = header.slice("Bearer ".length);

    try {
        const decoded = jwt.verify(token, env.jwtSecret);
        req.user = decoded;
        return next();
    } catch (_err) {
        return next(new ApiError(401, "Invalid or expired token"));
    }
}

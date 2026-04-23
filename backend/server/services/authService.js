import User from "../models/User.js";
import ApiError from "../utils/apiError.js";
import { signToken } from "../middleware/auth.js";

export function sanitizeUser(user) {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        provider: user.provider,
        role: user.role,
        phone: user.phone || "",
        preferences: user.preferences || { currency: "INR", notifications: true },
    };
}

export function createAuthPayload(user) {
    return {
        token: signToken(user),
        user: sanitizeUser(user),
    };
}

export async function signupLocal({ name, email, password }) {
    const normalizedEmail = email.toLowerCase().trim();

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
        throw new ApiError(409, "An account with this email already exists");
    }

    const user = await User.create({
        name: name || "",
        email: normalizedEmail,
        password,
        provider: "local",
    });

    return createAuthPayload(user);
}

export async function loginLocal({ email, password }) {
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail }).select("+password");
    if (!user || !user.password) {
        throw new ApiError(401, "Invalid email or password");
    }

    const matches = await user.comparePassword(password);
    if (!matches) {
        throw new ApiError(401, "Invalid email or password");
    }

    return createAuthPayload(user);
}

export async function getCurrentUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return sanitizeUser(user);
}

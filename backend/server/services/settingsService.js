import User from "../models/User.js";
import ApiError from "../utils/apiError.js";
import { sanitizeUser } from "./authService.js";
import UsageSnapshot from "../models/UsageSnapshot.js";
import Bill from "../models/Bill.js";
import Integration from "../models/Integration.js";

/**
 * Update user profile (name, email, phone)
 */
export async function updateProfile(userId, { name, email, phone }) {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    if (name !== undefined) user.name = name.trim();

    if (email !== undefined) {
        const normalizedEmail = email.toLowerCase().trim();
        if (normalizedEmail !== user.email) {
            const existing = await User.findOne({ email: normalizedEmail });
            if (existing) throw new ApiError(409, "Email is already in use by another account");
            user.email = normalizedEmail;
        }
    }

    if (phone !== undefined) user.phone = phone.trim();

    await user.save();
    return sanitizeUser(user);
}

/**
 * Update user preferences (currency, notifications)
 */
export async function updatePreferences(userId, { currency, notifications }) {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    if (currency !== undefined) user.preferences.currency = currency;
    if (notifications !== undefined) user.preferences.notifications = notifications;

    await user.save();
    return { preferences: user.preferences };
}

/**
 * Change user password
 */
export async function changePassword(userId, { currentPassword, newPassword }) {
    const user = await User.findById(userId).select("+password");
    if (!user) throw new ApiError(404, "User not found");

    // For OAuth users with no password set
    if (!user.password) {
        throw new ApiError(400, "Password change is not available for OAuth accounts. You signed in with " + user.provider);
    }

    const matches = await user.comparePassword(currentPassword);
    if (!matches) {
        throw new ApiError(401, "Current password is incorrect");
    }

    user.password = newPassword; // pre-save hook will hash it
    await user.save();

    return { message: "Password changed successfully" };
}

/**
 * Delete user account (with cascade: removes all user-owned data)
 */
export async function deleteAccount(userId) {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    // Cascade delete all user-owned data
    await Promise.all([
        UsageSnapshot.deleteMany({ owner: userId }),
        Bill.deleteMany({ owner: userId }),
        Integration.deleteMany({ owner: userId }),
    ]);

    await User.findByIdAndDelete(userId);
    return { message: "Account and all associated data deleted successfully" };
}

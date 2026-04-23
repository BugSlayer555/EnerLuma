import {
    updateProfile,
    updatePreferences,
    changePassword,
    deleteAccount,
} from "../services/settingsService.js";

export async function handleUpdateProfile(req, res) {
    const user = await updateProfile(req.user.id, req.body);
    res.json({ user, message: "Profile updated successfully" });
}

export async function handleUpdatePreferences(req, res) {
    const result = await updatePreferences(req.user.id, req.body);
    res.json({ ...result, message: "Preferences saved successfully" });
}

export async function handleChangePassword(req, res) {
    const result = await changePassword(req.user.id, req.body);
    res.json(result);
}

export async function handleDeleteAccount(req, res) {
    const result = await deleteAccount(req.user.id);
    res.json(result);
}

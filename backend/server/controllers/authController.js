import env from "../config/env.js";
import { createAuthPayload, getCurrentUser, loginLocal, signupLocal } from "../services/authService.js";

export async function signup(req, res) {
    const payload = await signupLocal(req.body);
    res.status(201).json(payload);
}

export async function login(req, res) {
    const payload = await loginLocal(req.body);
    res.json(payload);
}

export async function me(req, res) {
    const user = await getCurrentUser(req.user.id);
    res.json({ user });
}

export async function oauthCallback(req, res) {
    const payload = createAuthPayload(req.user);
    const redirect = `${env.frontendUrl}/auth/callback?token=${encodeURIComponent(payload.token)}`;
    res.redirect(redirect);
}

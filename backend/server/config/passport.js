import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import AppleStrategy from "passport-apple";
import User from "../models/User.js";

export default function configurePassport() {
    // ─── Google OAuth 2.0 ───────────────────────────────────────────────
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
        passport.use(
            new GoogleStrategy(
                {
                    clientID: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    callbackURL: `http://localhost:${process.env.PORT || 5000}/api/auth/google/callback`,
                    scope: ["profile", "email"],
                },
                async (_accessToken, _refreshToken, profile, done) => {
                    try {
                        const email =
                            profile.emails && profile.emails[0]
                                ? profile.emails[0].value
                                : "";
                        const avatar =
                            profile.photos && profile.photos[0]
                                ? profile.photos[0].value
                                : "";

                        const user = await User.findOrCreateFromOAuth({
                            provider: "google",
                            providerId: profile.id,
                            email,
                            name: profile.displayName || "",
                            avatar,
                        });

                        return done(null, user);
                    } catch (err) {
                        return done(err, null);
                    }
                }
            )
        );
        console.log("  ✓ Google OAuth strategy configured");
    } else {
        console.log(
            "  ⚠ Google OAuth skipped (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET not set)"
        );
    }

    // ─── Apple Sign-In ──────────────────────────────────────────────────
    if (
        process.env.APPLE_CLIENT_ID &&
        process.env.APPLE_TEAM_ID &&
        process.env.APPLE_KEY_ID
    ) {
        passport.use(
            new AppleStrategy(
                {
                    clientID: process.env.APPLE_CLIENT_ID,
                    teamID: process.env.APPLE_TEAM_ID,
                    keyID: process.env.APPLE_KEY_ID,
                    privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH || "",
                    callbackURL: "/api/auth/apple/callback",
                    scope: ["name", "email"],
                },
                async (_accessToken, _refreshToken, idToken, profile, done) => {
                    try {
                        // Apple may only send the user's name on the FIRST login
                        const email = profile.email || (idToken && idToken.email) || "";
                        const name =
                            profile.name
                                ? `${profile.name.firstName || ""} ${profile.name.lastName || ""}`.trim()
                                : "";

                        const user = await User.findOrCreateFromOAuth({
                            provider: "apple",
                            providerId: profile.id || (idToken && idToken.sub) || "",
                            email,
                            name,
                            avatar: "",
                        });

                        return done(null, user);
                    } catch (err) {
                        return done(err, null);
                    }
                }
            )
        );
        console.log("  ✓ Apple Sign-In strategy configured");
    } else {
        console.log(
            "  ⚠ Apple Sign-In skipped (APPLE_CLIENT_ID / APPLE_TEAM_ID / APPLE_KEY_ID not set)"
        );
    }

    // Passport serialization (not used for JWT, but required by Passport)
    passport.serializeUser((user, done) => done(null, user._id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}

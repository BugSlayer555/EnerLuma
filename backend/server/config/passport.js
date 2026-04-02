import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import AppleStrategy from "passport-apple";

import env from "./env.js";
import User from "../models/User.js";
import { logger } from "../utils/logger.js";

export default function configurePassport(passport) {
    if (env.googleClientId && env.googleClientSecret) {
        passport.use(
            new GoogleStrategy(
                {
                    clientID: env.googleClientId,
                    clientSecret: env.googleClientSecret,
                    callbackURL: `${env.serverUrl}/api/auth/google/callback`,
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
        logger.info("Google OAuth strategy configured");
    } else {
        logger.warn("Google OAuth skipped because credentials are not configured");
    }

    if (env.appleClientId && env.appleTeamId && env.appleKeyId) {
        passport.use(
            new AppleStrategy(
                {
                    clientID: env.appleClientId,
                    teamID: env.appleTeamId,
                    keyID: env.appleKeyId,
                    privateKeyLocation: env.applePrivateKeyPath,
                    callbackURL: `${env.serverUrl}/api/auth/apple/callback`,
                    scope: ["name", "email"],
                },
                async (_accessToken, _refreshToken, idToken, profile, done) => {
                    try {
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
        logger.info("Apple Sign-In strategy configured");
    } else {
        logger.warn("Apple Sign-In skipped because credentials are not configured");
    }

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

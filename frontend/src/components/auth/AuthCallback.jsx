// ─── OAuth Callback Handler ───────────────────────────────────────────────────
// This page receives the JWT token from OAuth redirects (Google/Apple)
// and stores it in localStorage, then redirects to the app.

import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function AuthCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (error) {
            console.error("OAuth error:", error);
            navigate("/login?error=" + error);
            return;
        }

        if (token) {
            localStorage.setItem("enerluma_token", token);
            // Redirect to home or dashboard
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }, [searchParams, navigate]);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#0f6a66",
                fontSize: 18,
            }}
        >
            Authenticating...
        </div>
    );
}

import { Sparkles } from "lucide-react";
import AiInsightsTab from "../components/dashboard/tabs/AiInsightsTab.jsx";

export default function AIInsightsPage() {
    return (
        <div style={{ maxWidth: "1400px", margin: "0 auto", paddingBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
                <div
                    style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #f0fdfa, #ccfbf1)",
                        border: "1px solid #99f6e4",
                        color: "#0f766e",
                        flexShrink: 0,
                    }}
                >
                    <Sparkles size={22} />
                </div>

                <div>
                    <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#111827", margin: 0 }}>
                        AI Intelligence Hub
                    </h1>
                    <p style={{ fontSize: "13px", color: "#9ca3af", margin: "4px 0 0" }}>
                        Predictive analytics, savings, efficiency, carbon, and maintenance insights.
                    </p>
                </div>
            </div>

            <AiInsightsTab />
        </div>
    );
}
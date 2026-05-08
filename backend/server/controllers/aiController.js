import { getAIInsights } from "../services/aiService.js";
import { getAssistantReply } from "../services/aiService.js";

export async function getInsights(req, res) {
    const data = await getAIInsights(req.user.id);
    res.json(data);
}

export async function chatAssistant(req, res) {
    const message = req.body?.message ?? req.query?.message ?? "";

    if (!String(message).trim()) {
        return res.status(400).json({ message: "message is required" });
    }

    const data = await getAssistantReply(message);
    res.json(data);
}

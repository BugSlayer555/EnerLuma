import { getAIInsights } from "../services/aiService.js";

export async function getInsights(req, res) {
    const data = await getAIInsights(req.user.id);
    res.json(data);
}

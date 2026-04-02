import { getWaterAnalytics } from "../services/waterService.js";

export async function getAnalytics(req, res) {
    const data = await getWaterAnalytics(req.user.id);
    res.json(data);
}

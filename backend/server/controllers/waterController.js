import { getWaterAnalytics } from "../services/waterService.js";
import Integration from "../models/Integration.js";

export async function getAnalytics(req, res) {
    const integration = await Integration.findOne({ owner: req.user.id, resource: "water" });
    if (!integration) {
        return res.json({ linked: false });
    }
    const data = await getWaterAnalytics(req.user.id);
    res.json({ linked: true, ...data });
}

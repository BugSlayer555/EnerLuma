import { getEnergyAnalytics } from "../services/energyService.js";
import Integration from "../models/Integration.js";

export async function getAnalytics(req, res) {
    const integration = await Integration.findOne({ owner: req.user.id, resource: "energy" });
    if (!integration) {
        return res.json({ linked: false });
    }
    const data = await getEnergyAnalytics(req.user.id);
    res.json({ linked: true, ...data });
}

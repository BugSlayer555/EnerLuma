import { getEnergyAnalytics } from "../services/energyService.js";

export async function getAnalytics(req, res) {
    const data = await getEnergyAnalytics(req.user.id);
    res.json(data);
}

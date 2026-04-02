import { getDashboardOverview } from "../services/dashboardService.js";

export async function getOverview(req, res) {
    const data = await getDashboardOverview(req.user.id);
    res.json(data);
}

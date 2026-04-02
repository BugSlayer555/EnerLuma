import { getAlerts } from "../services/alertService.js";

export async function listAlerts(req, res) {
    const alerts = await getAlerts(req.user.id);
    res.json({ alerts });
}

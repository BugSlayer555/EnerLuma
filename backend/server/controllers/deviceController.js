import { getDeviceAnalytics, getDevices } from "../services/deviceService.js";

export async function listDevices(req, res) {
    const devices = await getDevices(req.user.id);
    res.json({ devices });
}

export async function getAnalytics(req, res) {
    const data = await getDeviceAnalytics(req.user.id, req.params.deviceId);
    res.json(data);
}

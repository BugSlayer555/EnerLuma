import env from "../config/env.js";
import ApiError from "../utils/apiError.js";
import { logger } from "../utils/logger.js";

export async function receiveWebhook(req, res) {
    const signature = req.headers["x-enerluma-signature"];

    if (env.webhookSecret) {
        if (!signature || signature !== env.webhookSecret) {
            throw new ApiError(401, "Invalid webhook signature");
        }
    }

    logger.info("Webhook received", {
        provider: req.body?.provider || "unknown",
        event: req.body?.event || "unknown",
    });

    res.status(202).json({ accepted: true });
}

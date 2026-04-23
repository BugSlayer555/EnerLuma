import Integration from "../models/Integration.js";
import ApiError from "../utils/apiError.js";
import { syncIntegration } from "../services/utilityIntegrationService.js";

export async function linkProvider(req, res) {
    const { providerId, providerName, consumerNumber, resource } = req.body;

    if (!providerId || !consumerNumber || !resource) {
        throw new ApiError(400, "Missing required fields");
    }

    try {
        const integration = await Integration.create({
            owner: req.user.id,
            providerId,
            providerName,
            resource,
            consumerNumber
        });

        // Await the initial sync backfill so data populates immediately
        await syncIntegration(integration);

        res.status(201).json({ success: true, integration });
    } catch (err) {
        if (err.code === 11000) {
            throw new ApiError(400, "This consumer number is already linked to this provider on your account.");
        }
        throw err;
    }
}

export async function getUserIntegrations(req, res) {
    const integrations = await Integration.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, integrations });
}

export async function triggerSync(req, res) {
    const { id } = req.params;
    const integration = await Integration.findOne({ _id: id, owner: req.user.id });
    
    if (!integration) {
        throw new ApiError(404, "Integration not found");
    }

    const result = await syncIntegration(integration);
    res.json(result);
}

export async function deleteIntegration(req, res) {
    const { id } = req.params;
    const integration = await Integration.findOneAndDelete({ _id: id, owner: req.user.id });
    
    if (!integration) {
        throw new ApiError(404, "Integration not found");
    }
    
    res.json({ success: true, message: "Unlinked successfully" });
}

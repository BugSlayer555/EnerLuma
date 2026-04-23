import UsageSnapshot from "../models/UsageSnapshot.js";
import ApiError from "../utils/apiError.js";

export async function createUsage(req, res) {
    const { resource, value, unit, cost, date, granularity } = req.body;

    if (!resource || !["energy", "water"].includes(resource)) {
        throw new ApiError(400, "Resource must be 'energy' or 'water'");
    }
    if (value == null || typeof value !== "number" || value < 0) {
        throw new ApiError(400, "Value must be a non-negative number");
    }
    if (!unit) {
        throw new ApiError(400, "Unit is required");
    }

    const snapshot = await UsageSnapshot.create({
        owner: req.user.id,
        resource,
        value,
        unit,
        cost: cost || 0,
        granularity: granularity || "day",
        bucketStart: date ? new Date(date) : new Date(),
        metadata: { source: "manual" },
    });

    res.status(201).json({ success: true, usage: snapshot });
}

export async function getUserUsage(req, res) {
    const { resource, limit = 50, page = 1 } = req.query;

    const filter = { owner: req.user.id };
    if (resource && ["energy", "water"].includes(resource)) {
        filter.resource = resource;
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const [entries, total] = await Promise.all([
        UsageSnapshot.find(filter)
            .sort({ bucketStart: -1 })
            .skip(skip)
            .limit(parseInt(limit, 10))
            .lean(),
        UsageSnapshot.countDocuments(filter),
    ]);

    res.json({
        success: true,
        entries,
        pagination: {
            total,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            pages: Math.ceil(total / parseInt(limit, 10)),
        },
    });
}

export async function deleteUsage(req, res) {
    const { id } = req.params;

    const entry = await UsageSnapshot.findOneAndDelete({
        _id: id,
        owner: req.user.id,
    });

    if (!entry) {
        throw new ApiError(404, "Usage entry not found");
    }

    res.json({ success: true, message: "Entry deleted" });
}

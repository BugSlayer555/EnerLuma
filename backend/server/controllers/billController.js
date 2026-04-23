import Bill from "../models/Bill.js";
import ApiError from "../utils/apiError.js";

export async function uploadBill(req, res) {
    if (!req.file) {
        throw new ApiError(400, "No file uploaded");
    }

    const {
        resource,
        provider,
        billingPeriodStart,
        billingPeriodEnd,
        amountDue,
        unitsConsumed,
        unit,
        notes,
    } = req.body;

    if (!resource || !["energy", "water"].includes(resource)) {
        throw new ApiError(400, "Resource must be 'energy' or 'water'");
    }

    const bill = await Bill.create({
        owner: req.user.id,
        resource,
        provider: provider || "",
        billingPeriodStart: billingPeriodStart ? new Date(billingPeriodStart) : null,
        billingPeriodEnd: billingPeriodEnd ? new Date(billingPeriodEnd) : null,
        amountDue: amountDue ? parseFloat(amountDue) : 0,
        unitsConsumed: unitsConsumed ? parseFloat(unitsConsumed) : 0,
        unit: unit || (resource === "energy" ? "kWh" : "gallons"),
        filePath: req.file.path.replace(/\\/g, "/"),
        originalFileName: req.file.originalname,
        mimeType: req.file.mimetype,
        notes: notes || "",
    });

    res.status(201).json({ success: true, bill });
}

export async function getUserBills(req, res) {
    const { resource, limit = 20, page = 1 } = req.query;

    const filter = { owner: req.user.id };
    if (resource && ["energy", "water"].includes(resource)) {
        filter.resource = resource;
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const [bills, total] = await Promise.all([
        Bill.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit, 10))
            .lean(),
        Bill.countDocuments(filter),
    ]);

    res.json({
        success: true,
        bills,
        pagination: {
            total,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            pages: Math.ceil(total / parseInt(limit, 10)),
        },
    });
}

export async function getBillById(req, res) {
    const { id } = req.params;

    const bill = await Bill.findOne({ _id: id, owner: req.user.id }).lean();
    if (!bill) {
        throw new ApiError(404, "Bill not found");
    }

    res.json({ success: true, bill });
}

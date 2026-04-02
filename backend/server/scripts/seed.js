import env from "../config/env.js";
import { connectDatabase } from "../config/db.js";
import User from "../models/User.js";
import Device from "../models/Device.js";
import Alert from "../models/Alert.js";
import UsageSnapshot from "../models/UsageSnapshot.js";
import { alertsData, dashboardOverviewData, devicesData } from "../data/mockData.js";
import { logger } from "../utils/logger.js";

async function ensureSeedUser() {
    const seedEmail = process.env.SEED_USER_EMAIL || "demo@enerluma.local";
    let user = await User.findOne({ email: seedEmail });

    if (!user) {
        user = await User.create({
            name: "EnerLuma Demo",
            email: seedEmail,
            password: process.env.SEED_USER_PASSWORD || "Enerluma123!",
            provider: "local",
        });
    }

    return user;
}

function toDateFromWeekday(index) {
    const now = new Date();
    const dayOffset = 6 - index;
    const d = new Date(now);
    d.setHours(0, 0, 0, 0);
    d.setDate(now.getDate() - dayOffset);
    return d;
}

async function seed() {
    await connectDatabase();

    const user = await ensureSeedUser();

    await Device.deleteMany({ owner: user._id });
    await Alert.deleteMany({ owner: user._id });
    await UsageSnapshot.deleteMany({ owner: user._id });

    await Device.insertMany(
        devicesData.map((d) => ({
            owner: user._id,
            slug: d.slug,
            name: d.name,
            room: d.room,
            type: d.type,
            status: d.status,
            signal: d.signal,
            latestConsumption: d.consumption,
        }))
    );

    await Alert.insertMany(
        alertsData.map((a) => ({
            owner: user._id,
            title: a.title,
            message: a.message,
            severity: a.severity,
            status: a.status,
            device: a.device,
        }))
    );

    const snapshots = [];

    dashboardOverviewData.weeklyData.forEach((entry, index) => {
        snapshots.push({
            owner: user._id,
            resource: "energy",
            granularity: "day",
            bucketStart: toDateFromWeekday(index),
            value: entry.energy,
            unit: "kWh",
            cost: Number((entry.energy * 4.6).toFixed(2)),
        });

        snapshots.push({
            owner: user._id,
            resource: "water",
            granularity: "day",
            bucketStart: toDateFromWeekday(index),
            value: entry.water,
            unit: "L",
            cost: Number((entry.water * 0.28).toFixed(2)),
        });
    });

    await UsageSnapshot.insertMany(snapshots);

    logger.info("Seed completed", {
        mongoUri: env.mongoUri,
        user: user.email,
        devices: devicesData.length,
        alerts: alertsData.length,
        snapshots: snapshots.length,
    });

    process.exit(0);
}

seed().catch((err) => {
    logger.error("Seed failed", { message: err.message, stack: err.stack });
    process.exit(1);
});

const LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
};

const currentLevelName = (process.env.LOG_LEVEL || "info").toLowerCase();
const currentLevel = LEVELS[currentLevelName] ?? LEVELS.info;

function shouldLog(level) {
    return LEVELS[level] <= currentLevel;
}

function output(level, message, meta = undefined) {
    if (!shouldLog(level)) return;

    const timestamp = new Date().toISOString();
    const payload = { timestamp, level, message, ...(meta ? { meta } : {}) };

    if (level === "error") {
        console.error(JSON.stringify(payload));
        return;
    }

    if (level === "warn") {
        console.warn(JSON.stringify(payload));
        return;
    }

    console.log(JSON.stringify(payload));
}

export const logger = {
    error: (message, meta) => output("error", message, meta),
    warn: (message, meta) => output("warn", message, meta),
    info: (message, meta) => output("info", message, meta),
    debug: (message, meta) => output("debug", message, meta),
};

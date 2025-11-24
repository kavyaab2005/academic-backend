import fs from "fs";
import path from "path";

// Create logs folder if not exists
const logDir = path.resolve("logs");
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Save normal logs
const logFile = path.join(logDir, "app.log");

// Save error logs
const errorFile = path.join(logDir, "error.log");

// Format datetime
const formatDate = () => {
    const now = new Date();
    return now.toISOString().replace("T", " ").split(".")[0];
};

// Main logger function
export const logger = (req, res, next) => {
    const data = `[${formatDate()}] ${req.method} ${req.originalUrl}`;

    fs.appendFile(logFile, data + "\n", (err) => {
        if (err) console.error("Logger error:", err);
    });

    next();
};

// Error logger
export const errorLogger = (error, req, res, next) => {
    const data = `[${formatDate()}] ERROR: ${error.message} | Route: ${
        req.method
    } ${req.originalUrl}\n`;

    fs.appendFile(errorFile, data, (err) => {
        if (err) console.error("Error logger failed:", err);
    });

    next(error);
};

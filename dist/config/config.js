"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.isProd = exports.NODE_ENV = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
// Local Brevo credentials are optional. Deployment environment variables take precedence.
const brevoFile = (0, path_1.resolve)(__dirname, "../../.env.brevo.json");
const localBrevo = (0, fs_1.existsSync)(brevoFile) ? JSON.parse((0, fs_1.readFileSync)(brevoFile, "utf8")) : {};
exports.NODE_ENV = process.env.NODE_ENV || "LOCAL";
exports.isProd = exports.NODE_ENV === "PROD";
exports.config = {
    env: exports.NODE_ENV,
    isProd: exports.isProd,
    server: {
        port: Number(process.env.PORT) || 8989,
        /** Origins allowed to call the API. `"*"` mirrors the previous behaviour. */
        corsOrigins: "*"
    },
    db: {
        uri: process.env.MONGO_URI ||
            "mongodb+srv://tuhinthakur1233:DY2p354LuqgXPef0@cluster0.r5uuwtr.mongodb.net/Saptadinga",
        serverSelectionTimeoutMS: 40000
    },
    auth: {
        jwtSecret: process.env.JWT_KEY ||
            "9903af2e3fedd2589d868569734c71c2015a74799891f6c29895c7d6f55104e619e87404f0f688e652afcad322c8e94763234b6137bc672458511c0945a6e023",
        jwtExpiresIn: "1y"
    },
    brevo: {
        apiKey: process.env.BREVO_API_KEY || localBrevo.apiKey || "",
        senderEmail: process.env.BREVO_SENDER_EMAIL || localBrevo.senderEmail || "",
        senderEmails: {
            hetalbon: process.env.BREVO_SENDER_EMAIL_HETALBON ||
                localBrevo.hetalbonSenderEmail ||
                process.env.BREVO_SENDER_EMAIL ||
                localBrevo.senderEmail ||
                "",
            machranga: process.env.BREVO_SENDER_EMAIL_MACHRANGA ||
                localBrevo.machrangaSenderEmail ||
                process.env.BREVO_SENDER_EMAIL ||
                localBrevo.senderEmail ||
                ""
        }
    },
    mail: {
        service: "gmail",
        user: process.env.SMTP_EMAIL || "tuhin81018@gmail.com",
        password: process.env.SMTP_PASSWORD || "MahuaThakur",
        fromName: "Resort Booking"
    },
    uploads: {
        path: process.env.FILE_PATH || "uploads/"
    },
    /** Room capacity used to decide when a date counts as fully booked. */
    inventory: {
        hetalbonRooms: 17,
        machrangaRooms: 7,
        /** Threshold used by the booking-calendar endpoints. */
        calendarMaxRooms: 5
    }
};
exports.default = exports.config;

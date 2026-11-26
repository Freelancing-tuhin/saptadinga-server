"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendGuestAcknowledgement = exports.sendEnquiry = void 0;
const enquiryEmail_1 = require("./enquiryEmail");
const guestAcknowledgement_1 = require("./guestAcknowledgement");
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config/config"));
function sendMail(recordId, _a) {
    var _b, _c;
    var { senderName, senderEmail } = _a, message = __rest(_a, ["senderName", "senderEmail"]);
    return __awaiter(this, void 0, void 0, function* () {
        const key = config_1.default.brevo.apiKey;
        const sender = senderEmail || config_1.default.brevo.senderEmail;
        if (!key || !sender) {
            console.error("Brevo configuration missing for enquiry", recordId);
            return;
        }
        try {
            yield axios_1.default.post("https://api.brevo.com/v3/smtp/email", Object.assign({ sender: { email: sender, name: senderName } }, message), { headers: { "api-key": key }, timeout: 10000 });
        }
        catch (error) {
            console.error("Brevo email failed", message.subject, recordId, axios_1.default.isAxiosError(error) ? (_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.status) !== null && _c !== void 0 ? _c : error.code : "unknown");
        }
    });
}
function sendEnquiry(subject, recordId, fields, kind, property) {
    return sendMail(recordId, {
        senderEmail: property ? config_1.default.brevo.senderEmails[property] : undefined,
        senderName: property ? `${property === "hetalbon" ? "Hetalbon" : "Machranga"} ${kind} enquiry` : undefined,
        to: [{ email: "enquiry@hetalbon.com" }],
        cc: [{ email: "prosenjit.kpa@gmail.com" }, { email: "tuhin81018@gmail.com" }],
        subject,
        htmlContent: property ? (0, enquiryEmail_1.enquiryEmail)(property, kind, fields) : undefined,
        textContent: Object.entries(fields).map(([label, value]) => `${label}: ${value !== null && value !== void 0 ? value : ""}`).join("\n")
    });
}
exports.sendEnquiry = sendEnquiry;
function sendGuestAcknowledgement(property, kind, recordId, guestEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = guestEmail === null || guestEmail === void 0 ? void 0 : guestEmail.trim();
        if (!email)
            return;
        yield sendMail(recordId, Object.assign({ senderEmail: config_1.default.brevo.senderEmails[property], to: [{ email }] }, (0, guestAcknowledgement_1.guestAcknowledgement)(property, kind)));
    });
}
exports.sendGuestAcknowledgement = sendGuestAcknowledgement;

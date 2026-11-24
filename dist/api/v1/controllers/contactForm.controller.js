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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactForms = exports.submitContactForm = void 0;
const contactForm_model_1 = __importDefault(require("../../../models/contactForm.model"));
const message_1 = require("../../../constants/message");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const apiResponse_1 = require("../../../utils/apiResponse");
const sendEnquiry_1 = require("../../../services/mail/sendEnquiry");
exports.submitContactForm = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, comment, tag } = req.body;
    const contact = yield contactForm_model_1.default.create({ name, email, phone, comment, tag });
    const property = req.body.property;
    if (property === "hetalbon" || property === "machranga") {
        void (0, sendEnquiry_1.sendGuestAcknowledgement)(property, "enquiry", contact.id, contact.email);
    }
    void (0, sendEnquiry_1.sendEnquiry)("New contact enquiry", contact.id, { name, email, phone, comment });
    return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.post.succ, contact);
}), message_1.MESSAGE.post.fail);
exports.getContactForms = (0, asyncHandler_1.asyncHandler)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield contactForm_model_1.default.find().sort({ createdAt: -1 });
    return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.get.succ, contacts);
}), message_1.MESSAGE.get.fail);

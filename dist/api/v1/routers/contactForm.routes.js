"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactForm_controller_1 = require("../controllers/contactForm.controller");
const router = express_1.default.Router();
router.post("/submit", contactForm_controller_1.submitContactForm);
router.get("/all", contactForm_controller_1.getContactForms);
exports.default = router;

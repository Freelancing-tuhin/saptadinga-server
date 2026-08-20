"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const contactFormSchema = new mongoose_1.Schema({
    name: model_constant_1.default.optionalNullString,
    email: model_constant_1.default.optionalNullString,
    phone: model_constant_1.default.requiredString,
    comment: model_constant_1.default.optionalNullString,
    tag: model_constant_1.default.optionalNullString
}, { timestamps: true });
exports.default = contactFormSchema;

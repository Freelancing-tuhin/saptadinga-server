"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const schemaOption_1 = require("../../constants/model/schemaOption");
const pageSchema = new mongoose_1.Schema({
    websiteId: model_constant_1.default.requiredObjectId,
    name: model_constant_1.default.requiredString,
    slug: model_constant_1.default.requiredString,
    content: {
        type: Object,
        default: {}
    }
}, schemaOption_1.GENERAL_SCHEMA_OPTIONS);
// Compound index to ensure page slug is unique per website
pageSchema.index({ websiteId: 1, slug: 1 }, { unique: true });
exports.default = pageSchema;

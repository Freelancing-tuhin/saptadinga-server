"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const website_schema_1 = __importDefault(require("./shcemaDefinations/website.schema"));
const WebsiteModel = (0, mongoose_1.model)("websites", website_schema_1.default);
exports.default = WebsiteModel;

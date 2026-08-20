"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const page_schema_1 = __importDefault(require("./shcemaDefinations/page.schema"));
const PageModel = (0, mongoose_1.model)("pages", page_schema_1.default);
exports.default = PageModel;

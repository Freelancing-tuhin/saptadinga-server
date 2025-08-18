"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const resort_bookings_schema_1 = __importDefault(require("./shcemaDefinations/resort_bookings.schema"));
const ResortBookingModel = (0, mongoose_1.model)("resort_bookings", resort_bookings_schema_1.default);
exports.default = ResortBookingModel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const schemaOption_1 = require("../../constants/model/schemaOption");
const cruiseBookingsSchema = new mongoose_1.Schema({
    user_name: model_constant_1.default.requiredString,
    user_phone: model_constant_1.default.requiredString,
    user_mail: model_constant_1.default.requiredString,
    roomCount: model_constant_1.default.requiredNumber,
    checkInDate: model_constant_1.default.optionalNullObject,
    checkOutDate: model_constant_1.default.optionalNullObject,
    totalPrice: model_constant_1.default.requiredNumber,
    guestCount: model_constant_1.default.requiredNumber,
    bookingDaysCount: model_constant_1.default.requiredNumber,
    status: model_constant_1.default.requiredString,
    roomType: {
        type: String,
        enum: ["Delux", "Normal", "Executive"],
        required: true,
    },
}, schemaOption_1.GENERAL_SCHEMA_OPTIONS);
exports.default = cruiseBookingsSchema;

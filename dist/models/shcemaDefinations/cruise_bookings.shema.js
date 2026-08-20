"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const model_constant_1 = __importDefault(require("../../constants/model/model.constant"));
const schemaOption_1 = require("../../constants/model/schemaOption");
const cruiseBookingsSchema = new mongoose_1.Schema({
    user_name: model_constant_1.default.optionalNullString,
    user_phone: model_constant_1.default.optionalNullString,
    checkInDate: model_constant_1.default.optionalNullObject,
    checkOutDate: model_constant_1.default.optionalNullObject,
    totalPrice: model_constant_1.default.optionalNullNumber,
    guestCount: model_constant_1.default.optionalNullNumber,
    bookingDaysCount: model_constant_1.default.optionalNullNumber,
    status: model_constant_1.default.optionalNullString,
    roomCount: model_constant_1.default.optionalNullNumber,
    comment: model_constant_1.default.optionalNullString
}, schemaOption_1.GENERAL_SCHEMA_OPTIONS);
exports.default = cruiseBookingsSchema;

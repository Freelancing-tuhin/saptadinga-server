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
exports.getCruiseBookingStats = void 0;
const cruiseBookings_model_1 = __importDefault(require("../../../../../models/cruiseBookings.model"));
const message_1 = require("../../../../../constants/message");
const booking_service_1 = require("../../../../../services/booking/booking.service");
const asyncHandler_1 = require("../../../../../utils/asyncHandler");
const apiResponse_1 = require("../../../../../utils/apiResponse");
/** Today / this-month / all-time counters for Machranga cruise bookings. */
exports.getCruiseBookingStats = (0, asyncHandler_1.asyncHandler)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, booking_service_1.getBookingCounters)(cruiseBookings_model_1.default);
    return (0, apiResponse_1.sendResult)(res, message_1.MESSAGE.get.succ, result);
}), message_1.MESSAGE.get.fail);

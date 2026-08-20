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
exports.checkFullyBookedDatesMachranga = exports.checkFullyBookedDatesHetalbon = void 0;
const config_1 = __importDefault(require("../../../../../config/config"));
const message_1 = require("../../../../../constants/message");
const resortBookings_model_1 = __importDefault(require("../../../../../models/resortBookings.model"));
const cruiseBookings_model_1 = __importDefault(require("../../../../../models/cruiseBookings.model"));
const booking_service_1 = require("../../../../../services/booking/booking.service");
const asyncHandler_1 = require("../../../../../utils/asyncHandler");
const apiResponse_1 = require("../../../../../utils/apiResponse");
/** Dates the calendar should block out, for whichever property's model it is given. */
const fullyBookedDatesHandler = (bookingModel) => (0, asyncHandler_1.asyncHandler)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield bookingModel.find();
    const fullyBookedDates = (0, booking_service_1.buildFullyBookedDates)(bookings, config_1.default.inventory.calendarMaxRooms);
    return (0, apiResponse_1.sendResults)(res, message_1.MESSAGE.get.succ, fullyBookedDates);
}), message_1.MESSAGE.get.fail);
exports.checkFullyBookedDatesHetalbon = fullyBookedDatesHandler(resortBookings_model_1.default);
exports.checkFullyBookedDatesMachranga = fullyBookedDatesHandler(cruiseBookings_model_1.default);

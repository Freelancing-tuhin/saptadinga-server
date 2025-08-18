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
const date_fns_1 = require("date-fns");
const resortBookings_model_1 = __importDefault(require("../../../../../models/resortBookings.model"));
const message_1 = require("../../../../../constants/message");
const cruiseBookings_model_1 = __importDefault(require("../../../../../models/cruiseBookings.model"));
const MAX_ROOMS = 5;
function getDatesBetween(startDate, endDate) {
    const dates = [];
    let currentDate = (0, date_fns_1.startOfDay)((0, date_fns_1.parseISO)(startDate));
    while (currentDate <= (0, date_fns_1.parseISO)(endDate)) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate = (0, date_fns_1.addDays)(currentDate, 1);
    }
    return dates;
}
const checkFullyBookedDatesHetalbon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield resortBookings_model_1.default.find();
        const roomCounts = {};
        bookings.forEach((booking) => {
            const { checkInDate, checkOutDate, roomCount } = booking;
            if (checkInDate && checkOutDate && roomCount) {
                const dates = getDatesBetween(checkInDate, checkOutDate);
                dates.forEach((date) => {
                    roomCounts[date] = (roomCounts[date] || 0) + roomCount;
                });
            }
        });
        const fullyBookedDates = Object.keys(roomCounts).filter((date) => roomCounts[date] >= MAX_ROOMS);
        res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            results: fullyBookedDates,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: message_1.MESSAGE.get.fail,
            error: error.message
        });
    }
});
exports.checkFullyBookedDatesHetalbon = checkFullyBookedDatesHetalbon;
const checkFullyBookedDatesMachranga = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield cruiseBookings_model_1.default.find();
        const roomCounts = {};
        bookings.forEach((booking) => {
            const { checkInDate, checkOutDate, roomCount } = booking;
            if (checkInDate && checkOutDate && roomCount) {
                const dates = getDatesBetween(checkInDate, checkOutDate);
                dates.forEach((date) => {
                    roomCounts[date] = (roomCounts[date] || 0) + roomCount;
                });
            }
        });
        const fullyBookedDates = Object.keys(roomCounts).filter((date) => roomCounts[date] >= MAX_ROOMS);
        res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            results: fullyBookedDates,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: message_1.MESSAGE.get.fail,
            error: error.message
        });
    }
});
exports.checkFullyBookedDatesMachranga = checkFullyBookedDatesMachranga;

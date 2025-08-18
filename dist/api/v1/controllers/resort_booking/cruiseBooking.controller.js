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
exports.getCruiseBookings = exports.bookCruise = void 0;
const message_1 = require("../../../../constants/message");
const cruiseBookings_model_1 = __importDefault(require("../../../../models/cruiseBookings.model"));
const bookCruise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_name, user_phone, user_mail, checkInDate, checkOutDate, totalPrice, guestCount, roomCount, roomType } = req.body;
        const booking = new cruiseBookings_model_1.default({
            user_name,
            user_phone,
            user_mail,
            checkInDate,
            checkOutDate,
            totalPrice,
            roomCount,
            guestCount,
            bookingDaysCount: calculateBookingDays(checkInDate, checkOutDate),
            status: "Booked",
            roomType
        });
        yield booking.save();
        return res.status(200).json({
            message: message_1.MESSAGE.post.succ,
            result: booking
        });
    }
    catch (error) {
        console.error("Error booking room:", error);
        return res.status(400).json({
            message: message_1.MESSAGE.post.fail
        });
    }
});
exports.bookCruise = bookCruise;
const calculateBookingDays = (checkInDate, checkOutDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // Hours * minutes * seconds * milliseconds
    const diffDays = Math.round(Math.abs((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / oneDay));
    return diffDays;
};
const getCruiseBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield cruiseBookings_model_1.default.find();
        return res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            result: bookings
        });
    }
    catch (error) {
        console.error("Error retrieving cruise bookings:", error);
        return res.status(400).json({
            message: message_1.MESSAGE.get.fail
        });
    }
});
exports.getCruiseBookings = getCruiseBookings;

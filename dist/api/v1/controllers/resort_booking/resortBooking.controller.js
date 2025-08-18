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
exports.getResortBookingAvailability = exports.getResortBookings = exports.bookResort = void 0;
const message_1 = require("../../../../constants/message");
const resortBookings_model_1 = __importDefault(require("../../../../models/resortBookings.model"));
const bookResort = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        // Save the booking
        const booking = new resortBookings_model_1.default(payload);
        yield booking.save();
        // Send confirmation email
        // await sendBookingConfirmationEmail(payload.user_mail, payload);
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
exports.bookResort = bookResort;
const calculateBookingDays = (checkInDate, checkOutDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // Hours * minutes * seconds * milliseconds
    const diffDays = Math.round(Math.abs((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / oneDay));
    return diffDays;
};
const getResortBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield resortBookings_model_1.default.find();
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
exports.getResortBookings = getResortBookings;
const getResortBookingAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all bookings
        const bookings = yield resortBookings_model_1.default.find();
        console.log("Total bookings found:", bookings.length);
        // Create a map to store room counts by date
        const dateRoomMap = new Map();
        // Process each booking to count rooms for each date
        bookings.forEach((booking, index) => {
            console.log(`Processing booking ${index + 1}:`, {
                checkInDate: booking.checkInDate,
                checkOutDate: booking.checkOutDate,
                roomCount: booking.roomCount
            });
            const checkIn = new Date(booking.checkInDate);
            const checkOut = new Date(booking.checkOutDate);
            console.log(`Parsed dates - CheckIn: ${checkIn}, CheckOut: ${checkOut}`);
            // Iterate through each date in the booking range
            const currentDate = new Date(checkIn);
            while (currentDate < checkOut) {
                const dateString = currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
                const currentRoomCount = dateRoomMap.get(dateString) || 0;
                dateRoomMap.set(dateString, currentRoomCount + booking.roomCount);
                console.log(`Date: ${dateString}, Rooms: ${currentRoomCount + booking.roomCount}`);
                // Move to next day
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });
        console.log("Final dateRoomMap:", Array.from(dateRoomMap.entries()));
        // Convert map to array format with availability status
        const availability = Array.from(dateRoomMap.entries()).map(([date, roomCount]) => {
            return {
                date,
                room: roomCount >= 17 ? "full" : roomCount
            };
        });
        // Sort by date
        availability.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        return res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            result: availability
        });
    }
    catch (error) {
        console.error("Error retrieving cruise booking availability:", error);
        return res.status(400).json({
            message: message_1.MESSAGE.get.fail
        });
    }
});
exports.getResortBookingAvailability = getResortBookingAvailability;

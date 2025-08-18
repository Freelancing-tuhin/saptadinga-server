"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cruiseBooking_controller_1 = require("../../controllers/resort_booking/cruiseBooking.controller");
const BookingCalender_controller_1 = require("../../controllers/dashboard/bookingCalender/BookingCalender.controller");
const machrangaBookingStats_1 = require("../../controllers/dashboard/bookingStats/machrangaBookingStats");
const router = express_1.default.Router();
router.route("/book_cruise").post(cruiseBooking_controller_1.bookCruise);
router.route("/check-cruise-dates").get(BookingCalender_controller_1.checkFullyBookedDatesMachranga);
router.route("/getAll-cruise-bookings").get(cruiseBooking_controller_1.getCruiseBookings);
router.route("/cruise-bookings-stats").get(machrangaBookingStats_1.getCruiseBookingStats);
module.exports = router;

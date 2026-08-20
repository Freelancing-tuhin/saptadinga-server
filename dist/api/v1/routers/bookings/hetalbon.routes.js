"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resortBooking_controller_1 = require("../../controllers/resort_booking/resortBooking.controller");
const BookingCalender_controller_1 = require("../../controllers/dashboard/bookingCalender/BookingCalender.controller");
const hetalnpnBookingstats_1 = require("../../controllers/dashboard/bookingStats/hetalnpnBookingstats");
const router = express_1.default.Router();
router.route("/book_resort").post(resortBooking_controller_1.bookResort);
router.route("/get-resort-booking-stats").get(resortBooking_controller_1.getResortBookingDashboardStats);
router.route("/check-resort-dates").get(BookingCalender_controller_1.checkFullyBookedDatesHetalbon);
router.route("/getAll-resort-bookings").get(resortBooking_controller_1.getResortBookings);
router.route("/resort-bookings-stats").get(hetalnpnBookingstats_1.getResortBookingStats);
router.route("/resort-bookings-dates").get(resortBooking_controller_1.getResortBookingAvailability);
router.route("/confirm-booking/:id").patch(resortBooking_controller_1.updateResortBooking);
router.route("/delete-booking/:id").delete(resortBooking_controller_1.deleteResortBooking);
exports.default = router;

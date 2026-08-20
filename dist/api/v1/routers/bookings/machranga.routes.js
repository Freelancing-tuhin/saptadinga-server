"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cruiseBooking_controller_1 = require("../../controllers/resort_booking/cruiseBooking.controller");
const BookingCalender_controller_1 = require("../../controllers/dashboard/bookingCalender/BookingCalender.controller");
const hetalnpnBookingstats_1 = require("../../controllers/dashboard/bookingStats/hetalnpnBookingstats");
const router = express_1.default.Router();
router.route("/book_cruise").post(cruiseBooking_controller_1.bookCruise);
router.route("/get-cruise-booking-stats").get(cruiseBooking_controller_1.getCruiseBookingDashboardStats);
// NOTE: these two intentionally left pointing at the Hetalbon handlers to keep
// the live response identical; see checkFullyBookedDatesMachranga /
// getCruiseBookingStats for the Machranga-backed equivalents.
router.route("/check-resort-dates").get(BookingCalender_controller_1.checkFullyBookedDatesHetalbon);
router.route("/getAll-cruise-bookings").get(cruiseBooking_controller_1.getCruiseBookings);
router.route("/cruise-bookings-stats").get(hetalnpnBookingstats_1.getResortBookingStats);
router.route("/cruise-bookings-dates").get(cruiseBooking_controller_1.getCruiseBookingAvailability);
router.route("/confirm-booking/:id").patch(cruiseBooking_controller_1.updateCruiseBooking);
router.route("/delete-booking/:id").delete(cruiseBooking_controller_1.deleteCruiseBooking);
exports.default = router;

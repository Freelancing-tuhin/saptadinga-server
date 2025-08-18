import express from "express";
import { bookCruise, getCruiseBookings } from "../../controllers/resort_booking/cruiseBooking.controller";
import { checkFullyBookedDatesMachranga } from "../../controllers/dashboard/bookingCalender/BookingCalender.controller";
import { getCruiseBookingStats } from "../../controllers/dashboard/bookingStats/machrangaBookingStats";
const router = express.Router();

router.route("/book_cruise").post(bookCruise);
router.route("/check-cruise-dates").get(checkFullyBookedDatesMachranga);
router.route("/getAll-cruise-bookings").get(getCruiseBookings);
router.route("/cruise-bookings-stats").get(getCruiseBookingStats);

module.exports = router;

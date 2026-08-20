import express from "express";
import {
	bookCruise,
	deleteCruiseBooking,
	getCruiseBookingAvailability,
	getCruiseBookingDashboardStats,
	getCruiseBookings,
	updateCruiseBooking
} from "../../controllers/resort_booking/cruiseBooking.controller";
import { checkFullyBookedDatesHetalbon } from "../../controllers/dashboard/bookingCalender/BookingCalender.controller";
import { getResortBookingStats } from "../../controllers/dashboard/bookingStats/hetalnpnBookingstats";

const router = express.Router();

router.route("/book_cruise").post(bookCruise);
router.route("/get-cruise-booking-stats").get(getCruiseBookingDashboardStats);
// NOTE: these two intentionally left pointing at the Hetalbon handlers to keep
// the live response identical; see checkFullyBookedDatesMachranga /
// getCruiseBookingStats for the Machranga-backed equivalents.
router.route("/check-resort-dates").get(checkFullyBookedDatesHetalbon);
router.route("/getAll-cruise-bookings").get(getCruiseBookings);
router.route("/cruise-bookings-stats").get(getResortBookingStats);
router.route("/cruise-bookings-dates").get(getCruiseBookingAvailability);
router.route("/confirm-booking/:id").patch(updateCruiseBooking);
router.route("/delete-booking/:id").delete(deleteCruiseBooking);

export default router;

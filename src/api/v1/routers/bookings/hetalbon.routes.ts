import express from "express";
import {
	bookResort,
	deleteResortBooking,
	getResortBookingAvailability,
	getResortBookingDashboardStats,
	getResortBookings,
	updateResortBooking
} from "../../controllers/resort_booking/resortBooking.controller";
import { checkFullyBookedDatesHetalbon } from "../../controllers/dashboard/bookingCalender/BookingCalender.controller";
import { getResortBookingStats } from "../../controllers/dashboard/bookingStats/hetalnpnBookingstats";

const router = express.Router();

router.route("/book_resort").post(bookResort);
router.route("/get-resort-booking-stats").get(getResortBookingDashboardStats);
router.route("/check-resort-dates").get(checkFullyBookedDatesHetalbon);
router.route("/getAll-resort-bookings").get(getResortBookings);
router.route("/resort-bookings-stats").get(getResortBookingStats);
router.route("/resort-bookings-dates").get(getResortBookingAvailability);
router.route("/confirm-booking/:id").patch(updateResortBooking);
router.route("/delete-booking/:id").delete(deleteResortBooking);

export default router;

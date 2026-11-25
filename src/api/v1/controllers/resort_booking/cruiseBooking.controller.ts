import { sendGuestAcknowledgement, sendEnquiry } from "../../../../services/mail/sendEnquiry";
import config from "../../../../config/config";
import CruiseBookingModel from "../../../../models/cruiseBookings.model";
import { createBookingControllers } from "./booking.controller.factory";

/** Machranga cruise bookings. Only CONFIRMED bookings feed stats/availability. */
const controllers = createBookingControllers({
	bookingModel: CruiseBookingModel,
	capacity: config.inventory.machrangaRooms,
	confirmedOnly: true,
	onEnquiry: async (booking, id) => {
		await Promise.all([
			sendGuestAcknowledgement("machranga", "booking request", id, booking.user_mail),
			sendEnquiry("New Machranga Cruise booking enquiry", id, {
				Name: booking.user_name,
				Phone: booking.user_phone,
				Email: booking.user_mail,
				"Check-in": booking.checkInDate,
				"Check-out": booking.checkOutDate,
				Rooms: booking.roomCount,
				Guests: booking.guestCount,
				Comment: booking.comment
			}, "machranga")
		]);
	}
});

export const bookCruise = controllers.create;
export const getCruiseBookingDashboardStats = controllers.getDashboardStats;
export const updateCruiseBooking = controllers.update;
export const getCruiseBookings = controllers.list;
export const getCruiseBookingAvailability = controllers.getAvailability;
export const deleteCruiseBooking = controllers.remove;

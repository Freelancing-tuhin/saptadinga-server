import { sendGuestAcknowledgement, sendEnquiry } from "../../../../services/mail/sendEnquiry";
import config from "../../../../config/config";
import ResortBookingModel from "../../../../models/resortBookings.model";
import { createBookingControllers } from "./booking.controller.factory";

/** Hetalbon resort bookings. Stats and availability count every booking. */
const controllers = createBookingControllers({
	bookingModel: ResortBookingModel,
	capacity: config.inventory.hetalbonRooms,
	confirmedOnly: false,
	onEnquiry: async (booking, id) => {
		await Promise.all([
			sendGuestAcknowledgement("hetalbon", "booking request", id, booking.user_mail),
			sendEnquiry("New Hetalbon booking enquiry", id, {
				Name: booking.user_name,
				Phone: booking.user_phone,
				Email: booking.user_mail,
				"Check-in": booking.checkInDate,
				"Check-out": booking.checkOutDate,
				Rooms: booking.roomCount,
				Guests: booking.guestCount,
				Activities: booking.activities,
				Comment: booking.comment
			})
		]);
	}
});

export const bookResort = controllers.create;
export const getResortBookingDashboardStats = controllers.getDashboardStats;
export const updateResortBooking = controllers.update;
export const getResortBookings = controllers.list;
export const getResortBookingAvailability = controllers.getAvailability;
export const deleteResortBooking = controllers.remove;

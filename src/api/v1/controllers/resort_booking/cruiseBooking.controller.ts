import config from "../../../../config/config";
import CruiseBookingModel from "../../../../models/cruiseBookings.model";
import { createBookingControllers } from "./booking.controller.factory";

/** Machranga cruise bookings. Only CONFIRMED bookings feed stats/availability. */
const controllers = createBookingControllers({
	bookingModel: CruiseBookingModel,
	capacity: config.inventory.machrangaRooms,
	confirmedOnly: true
});

export const bookCruise = controllers.create;
export const getCruiseBookingDashboardStats = controllers.getDashboardStats;
export const updateCruiseBooking = controllers.update;
export const getCruiseBookings = controllers.list;
export const getCruiseBookingAvailability = controllers.getAvailability;
export const deleteCruiseBooking = controllers.remove;

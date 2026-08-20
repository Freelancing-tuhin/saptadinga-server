import config from "../../../../config/config";
import ResortBookingModel from "../../../../models/resortBookings.model";
import { createBookingControllers } from "./booking.controller.factory";

/** Hetalbon resort bookings. Stats and availability count every booking. */
const controllers = createBookingControllers({
	bookingModel: ResortBookingModel,
	capacity: config.inventory.hetalbonRooms,
	confirmedOnly: false
});

export const bookResort = controllers.create;
export const getResortBookingDashboardStats = controllers.getDashboardStats;
export const updateResortBooking = controllers.update;
export const getResortBookings = controllers.list;
export const getResortBookingAvailability = controllers.getAvailability;
export const deleteResortBooking = controllers.remove;

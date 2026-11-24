"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCruiseBooking = exports.getCruiseBookingAvailability = exports.getCruiseBookings = exports.updateCruiseBooking = exports.getCruiseBookingDashboardStats = exports.bookCruise = void 0;
const sendEnquiry_1 = require("../../../../services/mail/sendEnquiry");
const config_1 = __importDefault(require("../../../../config/config"));
const cruiseBookings_model_1 = __importDefault(require("../../../../models/cruiseBookings.model"));
const booking_controller_factory_1 = require("./booking.controller.factory");
/** Machranga cruise bookings. Only CONFIRMED bookings feed stats/availability. */
const controllers = (0, booking_controller_factory_1.createBookingControllers)({
    bookingModel: cruiseBookings_model_1.default,
    capacity: config_1.default.inventory.machrangaRooms,
    confirmedOnly: true,
    onEnquiry: (booking, id) => (0, sendEnquiry_1.sendGuestAcknowledgement)("machranga", "booking request", id, booking.user_mail)
});
exports.bookCruise = controllers.create;
exports.getCruiseBookingDashboardStats = controllers.getDashboardStats;
exports.updateCruiseBooking = controllers.update;
exports.getCruiseBookings = controllers.list;
exports.getCruiseBookingAvailability = controllers.getAvailability;
exports.deleteCruiseBooking = controllers.remove;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResortBooking = exports.getResortBookingAvailability = exports.getResortBookings = exports.updateResortBooking = exports.getResortBookingDashboardStats = exports.bookResort = void 0;
const config_1 = __importDefault(require("../../../../config/config"));
const resortBookings_model_1 = __importDefault(require("../../../../models/resortBookings.model"));
const booking_controller_factory_1 = require("./booking.controller.factory");
/** Hetalbon resort bookings. Stats and availability count every booking. */
const controllers = (0, booking_controller_factory_1.createBookingControllers)({
    bookingModel: resortBookings_model_1.default,
    capacity: config_1.default.inventory.hetalbonRooms,
    confirmedOnly: false
});
exports.bookResort = controllers.create;
exports.getResortBookingDashboardStats = controllers.getDashboardStats;
exports.updateResortBooking = controllers.update;
exports.getResortBookings = controllers.list;
exports.getResortBookingAvailability = controllers.getAvailability;
exports.deleteResortBooking = controllers.remove;

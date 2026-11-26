"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    onEnquiry: (booking, id) => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.all([
            (0, sendEnquiry_1.sendGuestAcknowledgement)("machranga", "booking request", id, booking.user_mail),
            (0, sendEnquiry_1.sendEnquiry)("New Machranga Cruise booking enquiry", id, {
                Name: booking.user_name,
                Phone: booking.user_phone,
                Email: booking.user_mail,
                "Check-in": booking.checkInDate,
                "Check-out": booking.checkOutDate,
                Rooms: booking.roomCount,
                Guests: booking.guestCount,
                Comment: booking.comment
            }, "Booking", "machranga")
        ]);
    })
});
exports.bookCruise = controllers.create;
exports.getCruiseBookingDashboardStats = controllers.getDashboardStats;
exports.updateCruiseBooking = controllers.update;
exports.getCruiseBookings = controllers.list;
exports.getCruiseBookingAvailability = controllers.getAvailability;
exports.deleteCruiseBooking = controllers.remove;

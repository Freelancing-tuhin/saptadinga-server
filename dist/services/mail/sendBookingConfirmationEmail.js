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
exports.sendBookingConfirmationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config/config"));
const logger_1 = require("../../utils/logger");
let transporter = null;
/** Created once and reused — a transport per email would reopen a connection each time. */
const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer_1.default.createTransport({
            service: config_1.default.mail.service,
            auth: {
                user: config_1.default.mail.user,
                pass: config_1.default.mail.password
            }
        });
    }
    return transporter;
};
const buildBookingConfirmationHtml = (booking) => `
	<h2>Hi there,</h2>
	<p>Your booking has been confirmed! 🎉</p>
	<p><strong>Check-in:</strong> ${booking.checkInDate}</p>
	<p><strong>Check-out:</strong> ${booking.checkOutDate}</p>
	<p><strong>Total Guests:</strong> ${booking.guestCount}</p>
	<p><strong>Room Type:</strong> ${booking.roomType}</p>
	<p><strong>Total Price:</strong> ₹${booking.totalPrice}</p>
	<p>We’re excited to host you. You’ll receive further updates closer to your check-in date.</p>
	<br/>
	<p>Best regards,<br/>The Resort Team</p>
`;
const sendBookingConfirmationEmail = (to, bookingDetails) => __awaiter(void 0, void 0, void 0, function* () {
    yield getTransporter().sendMail({
        from: `"${config_1.default.mail.fromName}" <${config_1.default.mail.user}>`,
        to,
        subject: "🏖️ Booking Confirmed - Your Resort Stay",
        html: buildBookingConfirmationHtml(bookingDetails)
    });
    logger_1.logger.info(`Booking confirmation sent to ${to}`);
});
exports.sendBookingConfirmationEmail = sendBookingConfirmationEmail;

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
/* eslint-disable @typescript-eslint/no-explicit-any */
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendBookingConfirmationEmail = (to, bookingDetails) => __awaiter(void 0, void 0, void 0, function* () {
    // Configure your SMTP transporter
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail", // or your SMTP provider
        auth: {
            user: process.env.SMTP_EMAIL, // Your email
            pass: process.env.SMTP_PASSWORD, // Your app password
        },
    });
    // Customize your email content
    const mailOptions = {
        from: `"Resort Booking" <${process.env.SMTP_EMAIL}>`,
        to: to,
        subject: "🏖️ Booking Confirmed - Your Resort Stay",
        html: `
			<h2>Hi there,</h2>
			<p>Your booking has been confirmed! 🎉</p>
			<p><strong>Check-in:</strong> ${bookingDetails.checkInDate}</p>
			<p><strong>Check-out:</strong> ${bookingDetails.checkOutDate}</p>
			<p><strong>Total Guests:</strong> ${bookingDetails.guestCount}</p>
			<p><strong>Room Type:</strong> ${bookingDetails.roomType}</p>
			<p><strong>Total Price:</strong> ₹${bookingDetails.totalPrice}</p>
			<p>We’re excited to host you. You’ll receive further updates closer to your check-in date.</p>
			<br/>
			<p>Best regards,<br/>The Resort Team</p>
		`,
    };
    // Send the email
    yield transporter.sendMail(mailOptions);
});
exports.sendBookingConfirmationEmail = sendBookingConfirmationEmail;

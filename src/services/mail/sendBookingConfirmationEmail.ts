import nodemailer, { Transporter } from "nodemailer";
import config from "../../config/config";
import { logger } from "../../utils/logger";

export interface BookingConfirmationDetails {
	checkInDate: string;
	checkOutDate: string;
	guestCount: number;
	roomType: string;
	totalPrice: number;
}

let transporter: Transporter | null = null;

/** Created once and reused — a transport per email would reopen a connection each time. */
const getTransporter = (): Transporter => {
	if (!transporter) {
		transporter = nodemailer.createTransport({
			service: config.mail.service,
			auth: {
				user: config.mail.user,
				pass: config.mail.password
			}
		});
	}

	return transporter;
};

const buildBookingConfirmationHtml = (booking: BookingConfirmationDetails): string => `
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

export const sendBookingConfirmationEmail = async (
	to: string,
	bookingDetails: BookingConfirmationDetails
): Promise<void> => {
	await getTransporter().sendMail({
		from: `"${config.mail.fromName}" <${config.mail.user}>`,
		to,
		subject: "🏖️ Booking Confirmed - Your Resort Stay",
		html: buildBookingConfirmationHtml(bookingDetails)
	});

	logger.info(`Booking confirmation sent to ${to}`);
};

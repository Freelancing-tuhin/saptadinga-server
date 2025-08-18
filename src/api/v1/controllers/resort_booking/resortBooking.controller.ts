import { Request, Response } from "express";
import resortBookingsSchema from "../../../../models/shcemaDefinations/resort_bookings.schema";
import { MESSAGE } from "../../../../constants/message";
import ResortBookingModel from "../../../../models/resortBookings.model";
import { sendBookingConfirmationEmail } from "../../../../services/mail/sendBookingConfirmationEmail";

export const bookResort = async (req: Request, res: Response) => {
	try {
		const payload = req.body;

		// Save the booking
		const booking = new ResortBookingModel(payload);
		await booking.save();

		// Send confirmation email
		// await sendBookingConfirmationEmail(payload.user_mail, payload);

		return res.status(200).json({
			message: MESSAGE.post.succ,
			result: booking
		});
	} catch (error) {
		console.error("Error booking room:", error);
		return res.status(400).json({
			message: MESSAGE.post.fail
		});
	}
};

const calculateBookingDays = (checkInDate: Date, checkOutDate: Date): number => {
	const oneDay = 24 * 60 * 60 * 1000; // Hours * minutes * seconds * milliseconds
	const diffDays = Math.round(
		Math.abs((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / oneDay)
	);
	return diffDays;
};

export const getResortBookings = async (req: Request, res: Response) => {
	try {
		const bookings = await ResortBookingModel.find();

		return res.status(200).json({
			message: MESSAGE.get.succ,
			result: bookings
		});
	} catch (error) {
		console.error("Error retrieving cruise bookings:", error);

		return res.status(400).json({
			message: MESSAGE.get.fail
		});
	}
};

export const getResortBookingAvailability = async (req: Request, res: Response) => {
	try {
		// Get all bookings
		const bookings = await ResortBookingModel.find();

		console.log("Total bookings found:", bookings.length);

		// Create a map to store room counts by date
		const dateRoomMap = new Map<string, number>();

		// Process each booking to count rooms for each date
		bookings.forEach((booking, index) => {
			console.log(`Processing booking ${index + 1}:`, {
				checkInDate: booking.checkInDate,
				checkOutDate: booking.checkOutDate,
				roomCount: booking.roomCount
			});

			const checkIn = new Date(booking.checkInDate);
			const checkOut = new Date(booking.checkOutDate);

			console.log(`Parsed dates - CheckIn: ${checkIn}, CheckOut: ${checkOut}`);

			// Iterate through each date in the booking range
			const currentDate = new Date(checkIn);
			while (currentDate < checkOut) {
				const dateString = currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
				const currentRoomCount = dateRoomMap.get(dateString) || 0;
				dateRoomMap.set(dateString, currentRoomCount + booking.roomCount);

				console.log(`Date: ${dateString}, Rooms: ${currentRoomCount + booking.roomCount}`);

				// Move to next day
				currentDate.setDate(currentDate.getDate() + 1);
			}
		});

		console.log("Final dateRoomMap:", Array.from(dateRoomMap.entries()));

		// Convert map to array format with availability status
		const availability = Array.from(dateRoomMap.entries()).map(([date, roomCount]) => {
			return {
				date,
				room: roomCount >= 17 ? "full" : roomCount
			};
		});

		// Sort by date
		availability.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

		return res.status(200).json({
			message: MESSAGE.get.succ,
			result: availability
		});
	} catch (error) {
		console.error("Error retrieving cruise booking availability:", error);

		return res.status(400).json({
			message: MESSAGE.get.fail
		});
	}
};

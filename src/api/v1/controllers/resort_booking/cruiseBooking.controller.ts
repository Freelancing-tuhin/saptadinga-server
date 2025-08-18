import { Request, Response } from "express";
import resortBookingsSchema from "../../../../models/shcemaDefinations/resort_bookings.schema";
import { MESSAGE } from "../../../../constants/message";
import ResortBookingModel from "../../../../models/resortBookings.model";
import CruiseBookingModel from "../../../../models/cruiseBookings.model";

export const bookCruise = async (req: Request, res: Response) => {
	try {
		const {
			user_name,
			user_phone,
			user_mail,
			checkInDate,
			checkOutDate,
			totalPrice,
			guestCount,
			roomCount,
			roomType
		} = req.body;

		const booking = new CruiseBookingModel({
			user_name,
			user_phone,
			user_mail,
			checkInDate,
			checkOutDate,
			totalPrice,
			roomCount,
			guestCount,
			bookingDaysCount: calculateBookingDays(checkInDate, checkOutDate),
			status: "Booked",
			roomType
		});

		await booking.save();

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

export const getCruiseBookings = async (req: Request, res: Response) => {
	try {
		const bookings = await CruiseBookingModel.find();

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

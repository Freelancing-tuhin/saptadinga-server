import { Request, Response } from "express";
import { MESSAGE } from "../../../../constants/message";
import CruiseBookingModel from "../../../../models/cruiseBookings.model";

export const bookCruise = async (req: Request, res: Response) => {
	try {
		const payload = req.body;

		// Save the booking
		const booking = new CruiseBookingModel(payload);
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

// ...existing code...

export const getCruiseBookingDashboardStats = async (req: Request, res: Response) => {
	try {
		const bookings = await CruiseBookingModel.find();

		// Total bookings
		const totalBookings = bookings.length;

		// Unique customers by phone number
		const uniquePhones = new Set(bookings.map((b) => b.user_phone));
		const totalUniqueCustomers = uniquePhones.size;

		// Total income
		const totalIncome = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

		// Prepare series data for graph (group by month, always 12 months)
		const now = new Date();
		const year = now.getFullYear();
		const months = Array.from({ length: 12 }, (_, i) =>
			new Date(year, i, 1).toLocaleString("en-US", { month: "short", year: "numeric" })
		);

		// Initialize stats
		const monthlyStats: Record<string, { bookings: number; guests: number; income: number }> = {};
		months.forEach((m) => (monthlyStats[m] = { bookings: 0, guests: 0, income: 0 }));

		bookings.forEach((b) => {
			const d = new Date(b.checkInDate);
			if (d.getFullYear() === year) {
				const month = d.toLocaleString("en-US", { month: "short", year: "numeric" });
				monthlyStats[month].bookings += 1;
				monthlyStats[month].guests += b.guestCount || 0;
				monthlyStats[month].income += b.totalPrice || 0;
			}
		});

		const series = [
			{
				name: "Bookings",
				data: months.map((m) => monthlyStats[m].bookings)
			},
			{
				name: "Guests",
				data: months.map((m) => monthlyStats[m].guests)
			},
			{
				name: "Income",
				data: months.map((m) => monthlyStats[m].income / 10000) // in tens of thousands
			}
		];

		return res.status(200).json({
			message: MESSAGE.get.succ,
			totalBookings,
			totalUniqueCustomers,
			totalIncome,
			months,
			series
		});
	} catch (error) {
		console.error("Error getting dashboard stats:", error);
		return res.status(400).json({
			message: MESSAGE.get.fail
		});
	}
};
export const updateCruiseBooking = async (req: Request, res: Response) => {
	console.log("======> Update Cruise Booking Called <=======");
	try {
		const { id } = req.params;
		const payload = req.body;

		const updatedBooking = await CruiseBookingModel.findByIdAndUpdate(id, payload, { new: true });

		if (!updatedBooking) {
			return res.status(404).json({
				message: MESSAGE.patch.fail
			});
		}

		return res.status(200).json({
			message: MESSAGE.patch.succ,
			result: updatedBooking
		});
	} catch (error) {
		console.error("Error updating booking:", error);
		return res.status(400).json({
			message: MESSAGE.patch.fail
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
		const bookings = await CruiseBookingModel.find().sort({ createdAt: -1 });

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

export const getCruiseBookingAvailability = async (req: Request, res: Response) => {
	try {
		// Get all bookings
		const bookings = await CruiseBookingModel.find();

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
				room: roomCount >= 7 ? "full" : roomCount
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

export const deleteCruiseBooking = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const deletedBooking = await CruiseBookingModel.findByIdAndDelete(id);
		if (!deletedBooking) {
			return res.status(404).json({
				message: MESSAGE.delete.fail
			});
		}
		return res.status(200).json({
			message: MESSAGE.delete.succ,
			result: deletedBooking
		});
	} catch (error) {
		console.error("Error deleting booking:", error);
		return res.status(400).json({
			message: MESSAGE.delete.fail
		});
	}
};

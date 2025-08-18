import { Request, Response } from "express";
import BookingModel from "../../../../../models/resortBookings.model";
import { MESSAGE } from "../../../../../constants/message";
import moment from "moment";

export const getMonthlyBookingStats = async (req: Request, res: Response) => {
	try {
		const userId = req.query.userId;
		const startOfYear = moment().startOf("year").toDate();

		const stats = await BookingModel.aggregate([
			{ $match: { userObjectId: userId, updatedAt: { $gte: startOfYear } } },
			{
				$group: {
					_id: { month: { $month: "$updatedAt" }, year: { $year: "$updatedAt" } },
					totalBookings: { $sum: 1 }
				}
			},
			{
				$sort: { "_id.year": 1, "_id.month": 1 }
			}
		]);

		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];

		const monthlyBookings = stats.map(({ _id, totalBookings }) => ({
			month: `${monthNames[_id.month - 1]}-${_id.year}`,
			totalBookings
		}));

		return res.status(200).json({
			message: MESSAGE.get.succ,
			monthlyBookings
		});
	} catch (error: any) {
		console.error("Error in getMonthlyBookingStats:", error);
		return res.status(400).json({
			message: MESSAGE.get.fail,
			error: error.message
		});
	}
};

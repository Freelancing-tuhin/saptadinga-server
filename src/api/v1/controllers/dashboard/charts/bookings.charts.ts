import { Request, Response } from "express";
import moment from "moment";
import BookingModel from "../../../../../models/resortBookings.model";
import { MESSAGE } from "../../../../../constants/message";
import { asyncHandler } from "../../../../../utils/asyncHandler";
import { respond } from "../../../../../utils/apiResponse";

const MONTH_NAMES = [
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

/** Bookings per month for the current year, for a single user. */
export const getMonthlyBookingStats = asyncHandler(async (req: Request, res: Response) => {
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
		{ $sort: { "_id.year": 1, "_id.month": 1 } }
	]);

	const monthlyBookings = stats.map(({ _id, totalBookings }) => ({
		month: `${MONTH_NAMES[_id.month - 1]}-${_id.year}`,
		totalBookings
	}));

	return respond(res, 200, MESSAGE.get.succ, { monthlyBookings });
}, MESSAGE.get.fail);

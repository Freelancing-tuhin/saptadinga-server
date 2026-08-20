import { Request, Response } from "express";
import ResortBookingModel from "../../../../../models/resortBookings.model";
import { MESSAGE } from "../../../../../constants/message";
import { getBookingCounters } from "../../../../../services/booking/booking.service";
import { asyncHandler } from "../../../../../utils/asyncHandler";
import { sendResult } from "../../../../../utils/apiResponse";

/** Today / this-month / all-time counters for Hetalbon resort bookings. */
export const getResortBookingStats = asyncHandler(async (_req: Request, res: Response) => {
	const result = await getBookingCounters(ResortBookingModel);

	return sendResult(res, MESSAGE.get.succ, result);
}, MESSAGE.get.fail);

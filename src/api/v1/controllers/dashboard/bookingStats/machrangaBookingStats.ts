import { Request, Response } from "express";
import CruiseBookingModel from "../../../../../models/cruiseBookings.model";
import { MESSAGE } from "../../../../../constants/message";
import { getBookingCounters } from "../../../../../services/booking/booking.service";
import { asyncHandler } from "../../../../../utils/asyncHandler";
import { sendResult } from "../../../../../utils/apiResponse";

/** Today / this-month / all-time counters for Machranga cruise bookings. */
export const getCruiseBookingStats = asyncHandler(async (_req: Request, res: Response) => {
	const result = await getBookingCounters(CruiseBookingModel);

	return sendResult(res, MESSAGE.get.succ, result);
}, MESSAGE.get.fail);

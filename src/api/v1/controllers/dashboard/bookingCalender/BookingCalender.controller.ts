import { Request, RequestHandler, Response } from "express";
import { Model } from "mongoose";
import config from "../../../../../config/config";
import { MESSAGE } from "../../../../../constants/message";
import ResortBookingModel from "../../../../../models/resortBookings.model";
import CruiseBookingModel from "../../../../../models/cruiseBookings.model";
import { IBookingsSchema } from "../../../../../ts/interfaces/bookings.interface";
import { buildFullyBookedDates } from "../../../../../services/booking/booking.service";
import { asyncHandler } from "../../../../../utils/asyncHandler";
import { sendResults } from "../../../../../utils/apiResponse";

/** Dates the calendar should block out, for whichever property's model it is given. */
const fullyBookedDatesHandler = (bookingModel: Model<IBookingsSchema>): RequestHandler =>
	asyncHandler(async (_req: Request, res: Response) => {
		const bookings = await bookingModel.find();
		const fullyBookedDates = buildFullyBookedDates(bookings, config.inventory.calendarMaxRooms);

		return sendResults(res, MESSAGE.get.succ, fullyBookedDates);
	}, MESSAGE.get.fail);

export const checkFullyBookedDatesHetalbon = fullyBookedDatesHandler(ResortBookingModel);

export const checkFullyBookedDatesMachranga = fullyBookedDatesHandler(CruiseBookingModel);

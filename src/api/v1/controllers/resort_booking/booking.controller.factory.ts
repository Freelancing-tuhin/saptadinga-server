import { Request, RequestHandler, Response } from "express";
import { Model } from "mongoose";
import { MESSAGE } from "../../../../constants/message";
import { IBookingsSchema } from "../../../../ts/interfaces/bookings.interface";
import { asyncHandler } from "../../../../utils/asyncHandler";
import { respond, sendResult } from "../../../../utils/apiResponse";
import { notFound } from "../../../../utils/appError";
import { buildAvailability, buildDashboardStats, isConfirmed } from "../../../../services/booking/booking.service";

/**
 * The resort (Hetalbon) and cruise (Machranga) booking endpoints are the same
 * CRUD surface over different collections, so both are built from this factory.
 * Only the property's capacity and whether unconfirmed bookings count differ.
 */
export interface BookingControllerOptions {
	/** Collection this property's bookings live in. */
	bookingModel: Model<IBookingsSchema>;
	/** Rooms available per night; at or above this a date reads as "full". */
	capacity: number;
	/**
	 * When true, only CONFIRMED bookings feed stats and availability. The two
	 * properties have always differed here, so it stays explicit per property.
	 */
	confirmedOnly: boolean;
	onEnquiry?: (booking: IBookingsSchema, id: string) => Promise<void>;
}

export interface BookingControllers {
	create: RequestHandler;
	getDashboardStats: RequestHandler;
	update: RequestHandler;
	list: RequestHandler;
	getAvailability: RequestHandler;
	remove: RequestHandler;
}

export const createBookingControllers = ({
	bookingModel,
	capacity,
	confirmedOnly,
	onEnquiry
}: BookingControllerOptions): BookingControllers => {
	const countable = (bookings: IBookingsSchema[]): IBookingsSchema[] =>
		confirmedOnly ? bookings.filter(isConfirmed) : bookings;

	return {
		create: asyncHandler(async (req: Request, res: Response) => {
			const booking = await bookingModel.create(req.body);
			if (req.body.notifyEnquiry === true) void onEnquiry?.(booking, booking.id);

			return sendResult(res, MESSAGE.post.succ, booking);
		}, MESSAGE.post.fail),

		getDashboardStats: asyncHandler(async (_req: Request, res: Response) => {
			const bookings = await bookingModel.find();

			return respond(res, 200, MESSAGE.get.succ, { ...buildDashboardStats(countable(bookings)) });
		}, MESSAGE.get.fail),

		update: asyncHandler(async (req: Request, res: Response) => {
			const updated = await bookingModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

			if (!updated) throw notFound(MESSAGE.patch.fail);

			return sendResult(res, MESSAGE.patch.succ, updated);
		}, MESSAGE.patch.fail),

		list: asyncHandler(async (_req: Request, res: Response) => {
			const bookings = await bookingModel.find().sort({ createdAt: -1 });

			return sendResult(res, MESSAGE.get.succ, bookings);
		}, MESSAGE.get.fail),

		getAvailability: asyncHandler(async (_req: Request, res: Response) => {
			const bookings = await bookingModel.find();

			return sendResult(res, MESSAGE.get.succ, buildAvailability(countable(bookings), capacity));
		}, MESSAGE.get.fail),

		remove: asyncHandler(async (req: Request, res: Response) => {
			const deleted = await bookingModel.findByIdAndDelete(req.params.id);

			if (!deleted) throw notFound(MESSAGE.delete.fail);

			return sendResult(res, MESSAGE.delete.succ, deleted);
		}, MESSAGE.delete.fail)
	};
};

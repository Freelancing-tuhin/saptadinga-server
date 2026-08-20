import { Model } from "mongoose";
import { addDays, parseISO, startOfDay } from "date-fns";
import { IBookingsSchema } from "../../ts/interfaces/bookings.interface";

/**
 * Booking maths shared by the resort (Hetalbon) and cruise (Machranga)
 * controllers. These are pure functions over already-loaded documents — they do
 * no I/O and produce exactly the payloads the existing endpoints return.
 */

export type BookingDoc = IBookingsSchema;

const CONFIRMED = "CONFIRMED";

export const isConfirmed = (booking: BookingDoc): boolean =>
	(booking.status || "").toString().toUpperCase() === CONFIRMED;

/** `YYYY-MM-DD` key for a date, matching the format the endpoints emit. */
const toDateKey = (date: Date): string => date.toISOString().split("T")[0];

export interface DashboardStats {
	totalBookings: number;
	totalUniqueCustomers: number;
	totalIncome: number;
	months: string[];
	series: Array<{ name: string; data: number[] }>;
}

/**
 * Twelve-month totals for the dashboard graph. Income is emitted in tens of
 * thousands, as the charts expect.
 */
export const buildDashboardStats = (bookings: BookingDoc[]): DashboardStats => {
	const totalBookings = bookings.length;
	const totalUniqueCustomers = new Set(bookings.map((b) => b.user_phone)).size;
	const totalIncome = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

	const year = new Date().getFullYear();
	const months = Array.from({ length: 12 }, (_, i) =>
		new Date(year, i, 1).toLocaleString("en-US", { month: "short", year: "numeric" })
	);

	const monthlyStats: Record<string, { bookings: number; guests: number; income: number }> = {};
	months.forEach((m) => (monthlyStats[m] = { bookings: 0, guests: 0, income: 0 }));

	bookings.forEach((b) => {
		const checkIn = new Date(b.checkInDate);
		if (checkIn.getFullYear() !== year) return;

		const month = checkIn.toLocaleString("en-US", { month: "short", year: "numeric" });
		monthlyStats[month].bookings += 1;
		monthlyStats[month].guests += b.guestCount || 0;
		monthlyStats[month].income += b.totalPrice || 0;
	});

	return {
		totalBookings,
		totalUniqueCustomers,
		totalIncome,
		months,
		series: [
			{ name: "Bookings", data: months.map((m) => monthlyStats[m].bookings) },
			{ name: "Guests", data: months.map((m) => monthlyStats[m].guests) },
			{ name: "Income", data: months.map((m) => monthlyStats[m].income / 10000) } // in tens of thousands
		]
	};
};

export interface DateAvailability {
	date: string;
	room: number | "full";
}

/**
 * Rooms taken per night, ascending by date. The checkout day is not counted as
 * an occupied night.
 */
export const buildAvailability = (bookings: BookingDoc[], capacity: number): DateAvailability[] => {
	const roomsByDate = new Map<string, number>();

	bookings.forEach((booking) => {
		const checkOut = new Date(booking.checkOutDate);
		const cursor = new Date(booking.checkInDate);

		while (cursor < checkOut) {
			const key = toDateKey(cursor);
			roomsByDate.set(key, (roomsByDate.get(key) || 0) + booking.roomCount);
			cursor.setDate(cursor.getDate() + 1);
		}
	});

	return Array.from(roomsByDate.entries())
		.map(([date, roomCount]) => ({ date, room: roomCount >= capacity ? ("full" as const) : roomCount }))
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

/** Every date from `startDate` to `endDate`, both ends included. */
export const getDatesBetween = (startDate: string, endDate: string): string[] => {
	const dates: string[] = [];
	const end = parseISO(endDate);
	let cursor = startOfDay(parseISO(startDate));

	while (cursor <= end) {
		dates.push(toDateKey(cursor));
		cursor = addDays(cursor, 1);
	}

	return dates;
};

/**
 * Dates where booked rooms reach `maxRooms`, counting the checkout day —
 * the rule the booking calendar has always used.
 */
export const buildFullyBookedDates = (bookings: BookingDoc[], maxRooms: number): string[] => {
	const roomCounts: Record<string, number> = {};

	bookings.forEach(({ checkInDate, checkOutDate, roomCount }) => {
		if (!checkInDate || !checkOutDate || !roomCount) return;

		getDatesBetween(checkInDate, checkOutDate).forEach((date) => {
			roomCounts[date] = (roomCounts[date] || 0) + roomCount;
		});
	});

	return Object.keys(roomCounts).filter((date) => roomCounts[date] >= maxRooms);
};

export interface BookingCounters {
	totalBookings: number;
	todayBookings: number;
	monthBookings: number;
	totalRevenue: number;
}

/**
 * Today / this-month / all-time counters, computed in a single aggregation.
 * `checkInDate` is stored as a string, hence the `$toDate` coercion.
 */
export const getBookingCounters = async (bookingModel: Model<BookingDoc>): Promise<BookingCounters> => {
	const today = new Date();
	const startOfToday = new Date(new Date(today).setHours(0, 0, 0, 0));
	const endOfToday = new Date(new Date(today).setHours(23, 59, 59, 999));
	const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

	const withinRange = (from: Date, to: Date) => [
		{
			$match: {
				$expr: {
					$and: [{ $gte: [{ $toDate: "$checkInDate" }, from] }, { $lte: [{ $toDate: "$checkInDate" }, to] }]
				}
			}
		},
		{ $count: "count" }
	];

	const [stats] = await bookingModel.aggregate([
		{
			$facet: {
				totalBookings: [{ $count: "count" }],
				todayBookings: withinRange(startOfToday, endOfToday),
				monthBookings: withinRange(startOfMonth, endOfMonth),
				totalRevenue: [{ $group: { _id: null, total: { $sum: "$totalPrice" } } }]
			}
		}
	]);

	return {
		totalBookings: stats.totalBookings[0]?.count || 0,
		todayBookings: stats.todayBookings[0]?.count || 0,
		monthBookings: stats.monthBookings[0]?.count || 0,
		totalRevenue: stats.totalRevenue[0]?.total || 0
	};
};

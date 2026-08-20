"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingCounters = exports.buildFullyBookedDates = exports.getDatesBetween = exports.buildAvailability = exports.buildDashboardStats = exports.isConfirmed = void 0;
const date_fns_1 = require("date-fns");
const CONFIRMED = "CONFIRMED";
const isConfirmed = (booking) => (booking.status || "").toString().toUpperCase() === CONFIRMED;
exports.isConfirmed = isConfirmed;
/** `YYYY-MM-DD` key for a date, matching the format the endpoints emit. */
const toDateKey = (date) => date.toISOString().split("T")[0];
/**
 * Twelve-month totals for the dashboard graph. Income is emitted in tens of
 * thousands, as the charts expect.
 */
const buildDashboardStats = (bookings) => {
    const totalBookings = bookings.length;
    const totalUniqueCustomers = new Set(bookings.map((b) => b.user_phone)).size;
    const totalIncome = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    const year = new Date().getFullYear();
    const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1).toLocaleString("en-US", { month: "short", year: "numeric" }));
    const monthlyStats = {};
    months.forEach((m) => (monthlyStats[m] = { bookings: 0, guests: 0, income: 0 }));
    bookings.forEach((b) => {
        const checkIn = new Date(b.checkInDate);
        if (checkIn.getFullYear() !== year)
            return;
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
exports.buildDashboardStats = buildDashboardStats;
/**
 * Rooms taken per night, ascending by date. The checkout day is not counted as
 * an occupied night.
 */
const buildAvailability = (bookings, capacity) => {
    const roomsByDate = new Map();
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
        .map(([date, roomCount]) => ({ date, room: roomCount >= capacity ? "full" : roomCount }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};
exports.buildAvailability = buildAvailability;
/** Every date from `startDate` to `endDate`, both ends included. */
const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    const end = (0, date_fns_1.parseISO)(endDate);
    let cursor = (0, date_fns_1.startOfDay)((0, date_fns_1.parseISO)(startDate));
    while (cursor <= end) {
        dates.push(toDateKey(cursor));
        cursor = (0, date_fns_1.addDays)(cursor, 1);
    }
    return dates;
};
exports.getDatesBetween = getDatesBetween;
/**
 * Dates where booked rooms reach `maxRooms`, counting the checkout day —
 * the rule the booking calendar has always used.
 */
const buildFullyBookedDates = (bookings, maxRooms) => {
    const roomCounts = {};
    bookings.forEach(({ checkInDate, checkOutDate, roomCount }) => {
        if (!checkInDate || !checkOutDate || !roomCount)
            return;
        (0, exports.getDatesBetween)(checkInDate, checkOutDate).forEach((date) => {
            roomCounts[date] = (roomCounts[date] || 0) + roomCount;
        });
    });
    return Object.keys(roomCounts).filter((date) => roomCounts[date] >= maxRooms);
};
exports.buildFullyBookedDates = buildFullyBookedDates;
/**
 * Today / this-month / all-time counters, computed in a single aggregation.
 * `checkInDate` is stored as a string, hence the `$toDate` coercion.
 */
const getBookingCounters = (bookingModel) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const today = new Date();
    const startOfToday = new Date(new Date(today).setHours(0, 0, 0, 0));
    const endOfToday = new Date(new Date(today).setHours(23, 59, 59, 999));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const withinRange = (from, to) => [
        {
            $match: {
                $expr: {
                    $and: [{ $gte: [{ $toDate: "$checkInDate" }, from] }, { $lte: [{ $toDate: "$checkInDate" }, to] }]
                }
            }
        },
        { $count: "count" }
    ];
    const [stats] = yield bookingModel.aggregate([
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
        totalBookings: ((_a = stats.totalBookings[0]) === null || _a === void 0 ? void 0 : _a.count) || 0,
        todayBookings: ((_b = stats.todayBookings[0]) === null || _b === void 0 ? void 0 : _b.count) || 0,
        monthBookings: ((_c = stats.monthBookings[0]) === null || _c === void 0 ? void 0 : _c.count) || 0,
        totalRevenue: ((_d = stats.totalRevenue[0]) === null || _d === void 0 ? void 0 : _d.total) || 0
    };
});
exports.getBookingCounters = getBookingCounters;

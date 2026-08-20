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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlyBookingStats = void 0;
const moment_1 = __importDefault(require("moment"));
const resortBookings_model_1 = __importDefault(require("../../../../../models/resortBookings.model"));
const message_1 = require("../../../../../constants/message");
const asyncHandler_1 = require("../../../../../utils/asyncHandler");
const apiResponse_1 = require("../../../../../utils/apiResponse");
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
exports.getMonthlyBookingStats = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.userId;
    const startOfYear = (0, moment_1.default)().startOf("year").toDate();
    const stats = yield resortBookings_model_1.default.aggregate([
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
    return (0, apiResponse_1.respond)(res, 200, message_1.MESSAGE.get.succ, { monthlyBookings });
}), message_1.MESSAGE.get.fail);

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
exports.getResortBookingStats = void 0;
const resortBookings_model_1 = __importDefault(require("../../../../../models/resortBookings.model"));
const message_1 = require("../../../../../constants/message");
const getResortBookingStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const today = new Date();
        const startOfToday = new Date(today.setHours(0, 0, 0, 0));
        const endOfToday = new Date(today.setHours(23, 59, 59, 999));
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const stats = yield resortBookings_model_1.default.aggregate([
            {
                $facet: {
                    totalBookings: [{ $count: "count" }],
                    todayBookings: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $gte: [{ $toDate: "$checkInDate" }, startOfToday] },
                                        { $lte: [{ $toDate: "$checkInDate" }, endOfToday] }
                                    ]
                                }
                            }
                        },
                        { $count: "count" }
                    ],
                    monthBookings: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $gte: [{ $toDate: "$checkInDate" }, startOfMonth] },
                                        { $lte: [{ $toDate: "$checkInDate" }, endOfMonth] }
                                    ]
                                }
                            }
                        },
                        { $count: "count" }
                    ],
                    totalRevenue: [
                        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
                    ]
                }
            }
        ]);
        const result = {
            totalBookings: ((_a = stats[0].totalBookings[0]) === null || _a === void 0 ? void 0 : _a.count) || 0,
            todayBookings: ((_b = stats[0].todayBookings[0]) === null || _b === void 0 ? void 0 : _b.count) || 0,
            monthBookings: ((_c = stats[0].monthBookings[0]) === null || _c === void 0 ? void 0 : _c.count) || 0,
            totalRevenue: ((_d = stats[0].totalRevenue[0]) === null || _d === void 0 ? void 0 : _d.total) || 0,
        };
        return res.status(200).json({
            message: message_1.MESSAGE.get.succ,
            result
        });
    }
    catch (error) {
        console.error("Error retrieving booking statistics:", error);
        return res.status(400).json({
            message: message_1.MESSAGE.get.fail,
        });
    }
});
exports.getResortBookingStats = getResortBookingStats;

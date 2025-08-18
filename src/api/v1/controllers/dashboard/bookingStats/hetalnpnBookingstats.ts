import { Request, Response } from "express";
import ResortBookingModel from "../../../../../models/resortBookings.model";
import { MESSAGE } from "../../../../../constants/message";

export const getResortBookingStats = async (req: Request, res: Response) => {
    try {
        const today = new Date();
        const startOfToday = new Date(today.setHours(0, 0, 0, 0));
        const endOfToday = new Date(today.setHours(23, 59, 59, 999));

        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const stats = await ResortBookingModel.aggregate([
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
            totalBookings: stats[0].totalBookings[0]?.count || 0,
            todayBookings: stats[0].todayBookings[0]?.count || 0,
            monthBookings: stats[0].monthBookings[0]?.count || 0,
            totalRevenue: stats[0].totalRevenue[0]?.total || 0,
        };

        return res.status(200).json({
            message: MESSAGE.get.succ,
            result
        });
    } catch (error) {
        console.error("Error retrieving booking statistics:", error);

        return res.status(400).json({
            message: MESSAGE.get.fail,
        });
    }
};

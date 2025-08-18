import { Request, Response } from "express";
import { parseISO, startOfDay, addDays } from "date-fns";
import ResortBookingModel from "../../../../../models/resortBookings.model";
import { MESSAGE } from "../../../../../constants/message";
import CruiseBookingModel from "../../../../../models/cruiseBookings.model";

const MAX_ROOMS = 5; 

function getDatesBetween(startDate: string, endDate: string): string[] {
  const dates = [];
  let currentDate = startOfDay(parseISO(startDate));

  while (currentDate <= parseISO(endDate)) {
    dates.push(currentDate.toISOString().split("T")[0]); 
    currentDate = addDays(currentDate, 1);
  }

  return dates;
}

export const checkFullyBookedDatesHetalbon = async (req: Request, res: Response) => {
  try {
    const bookings = await ResortBookingModel.find();

    const roomCounts: Record<string, number> = {};

    bookings.forEach((booking) => {
      const { checkInDate, checkOutDate, roomCount } = booking;

      if (checkInDate && checkOutDate && roomCount) {
        const dates = getDatesBetween(checkInDate, checkOutDate);

        dates.forEach((date) => {
          roomCounts[date] = (roomCounts[date] || 0) + roomCount;
        });
      }
    });

    const fullyBookedDates = Object.keys(roomCounts).filter(
      (date) => roomCounts[date] >= MAX_ROOMS
    );

    res.status(200).json({
        message: MESSAGE.get.succ,
        results:fullyBookedDates,
    });
  } catch (error:any) {
    return res.status(400).json({
        message: MESSAGE.get.fail,
        error: error.message
    });
  }
};




export const checkFullyBookedDatesMachranga = async (req: Request, res: Response) => {
  try {
    const bookings = await CruiseBookingModel.find();

    const roomCounts: Record<string, number> = {};

    bookings.forEach((booking) => {
      const { checkInDate, checkOutDate, roomCount } = booking;

      if (checkInDate && checkOutDate && roomCount) {
        const dates = getDatesBetween(checkInDate, checkOutDate);

        dates.forEach((date) => {
          roomCounts[date] = (roomCounts[date] || 0) + roomCount;
        });
      }
    });

    const fullyBookedDates = Object.keys(roomCounts).filter(
      (date) => roomCounts[date] >= MAX_ROOMS
    );

    res.status(200).json({
        message: MESSAGE.get.succ,
        results:fullyBookedDates,
    });
  } catch (error:any) {
    return res.status(400).json({
        message: MESSAGE.get.fail,
        error: error.message
    });
  }
};

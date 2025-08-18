import { model } from "mongoose";
import { ICruiseBookingsSchema } from "../ts/interfaces/cruiseBooking.interface";
import cruiseBookingsSchema from "./shcemaDefinations/cruise_bookings.shema";

const CruiseBookingModel = model<ICruiseBookingsSchema>("cruise_bookings", cruiseBookingsSchema);

export default CruiseBookingModel;

import { model } from "mongoose";
import cruiseBookingsSchema from "./shcemaDefinations/cruise_bookings.shema";
import { IBookingsSchema } from "../ts/interfaces/bookings.interface";

const CruiseBookingModel = model<IBookingsSchema>("cruise_bookings", cruiseBookingsSchema);

export default CruiseBookingModel;

import { model } from "mongoose";
import { IBookingsSchema } from "../ts/interfaces/bookings.interface";
import resortBookingsSchema from "./shcemaDefinations/resort_bookings.schema";

const ResortBookingModel = model<IBookingsSchema>("resort_bookings", resortBookingsSchema);

export default ResortBookingModel;

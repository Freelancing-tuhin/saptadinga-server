import { IObjectId } from "./objectId.interface";

export interface ICruiseBookingsSchema {
	user_name: string;
	user_phone: string;
	user_mail: string;
	checkInDate: any;
	checkOutDate: any;
	totalPrice: number;
	bookingDaysCount: number;
	status: string;
	roomCount:number;
	guestCount: number;
	roomType:string;
}

export interface IBookings extends ICruiseBookingsSchema, IObjectId {}

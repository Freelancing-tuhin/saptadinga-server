import { IObjectId } from "./objectId.interface";

export interface IBookingsSchema {
	user_name: string;
	user_phone: string;
	user_mail: string;
	checkInDate: any;
	checkOutDate: any;
	totalPrice: number;
	bookingDaysCount: number;
	status: string;
	guestCount: number;
	roomType:string;
	roomCount:number;
	activities:any[]
}

export interface IBookings extends IBookingsSchema, IObjectId {}

import { Schema } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { ICruiseBookingsSchema } from "../../ts/interfaces/cruiseBooking.interface";

const cruiseBookingsSchema: Schema<ICruiseBookingsSchema> = new Schema<ICruiseBookingsSchema>(
	{
		user_name: SCHEMA_DEFINITION_PROPERTY.requiredString,
		user_phone: SCHEMA_DEFINITION_PROPERTY.requiredString,
		user_mail: SCHEMA_DEFINITION_PROPERTY.requiredString,
		roomCount:SCHEMA_DEFINITION_PROPERTY.requiredNumber,
		checkInDate: SCHEMA_DEFINITION_PROPERTY.optionalNullObject,
		checkOutDate: SCHEMA_DEFINITION_PROPERTY.optionalNullObject,
		totalPrice: SCHEMA_DEFINITION_PROPERTY.requiredNumber,
		guestCount: SCHEMA_DEFINITION_PROPERTY.requiredNumber,
		bookingDaysCount: SCHEMA_DEFINITION_PROPERTY.requiredNumber,
		status: SCHEMA_DEFINITION_PROPERTY.requiredString,
		roomType: {
			type: String,
			enum: ["Delux", "Normal", "Executive"], 
			required: true,
		},
	},
	GENERAL_SCHEMA_OPTIONS
);

export default cruiseBookingsSchema;

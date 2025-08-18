import { Schema } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { IBookingsSchema } from "../../ts/interfaces/bookings.interface";

const resortBookingsSchema: Schema<IBookingsSchema> = new Schema<IBookingsSchema>(
	{
		user_name: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		user_phone: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		user_mail: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		checkInDate: SCHEMA_DEFINITION_PROPERTY.optionalNullObject,
		checkOutDate: SCHEMA_DEFINITION_PROPERTY.optionalNullObject,
		totalPrice: SCHEMA_DEFINITION_PROPERTY.optionalNullNumber,
		guestCount: SCHEMA_DEFINITION_PROPERTY.optionalNullNumber,
		bookingDaysCount: SCHEMA_DEFINITION_PROPERTY.optionalNullNumber,
		status: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		roomCount: SCHEMA_DEFINITION_PROPERTY.optionalNullNumber,

		// roomType: {
		// 	type: String,
		// 	enum: ["Delux", "Normal", "Executive"],
		// 	required: true,
		// },

		activities: {
			type: [String],
			default: []
		}
	},
	GENERAL_SCHEMA_OPTIONS
);

export default resortBookingsSchema;

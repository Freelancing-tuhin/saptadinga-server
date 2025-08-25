import { Schema } from "mongoose";
import { IContactForm } from "../../ts/interfaces/contactForm.interface";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";

const contactFormSchema = new Schema<IContactForm>(
	{
		name: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		email: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		phone: SCHEMA_DEFINITION_PROPERTY.requiredString,
		comment: SCHEMA_DEFINITION_PROPERTY.optionalNullString
	},
	{ timestamps: true }
);

export default contactFormSchema;

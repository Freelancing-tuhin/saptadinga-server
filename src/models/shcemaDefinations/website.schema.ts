import { Schema } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { IWebsite } from "../../ts/interfaces/cms.interface";

const websiteSchema = new Schema<IWebsite>(
	{
		name: SCHEMA_DEFINITION_PROPERTY.requiredString,
		slug: {
			type: String,
			required: true,
			unique: true
		},
		description: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		logo: SCHEMA_DEFINITION_PROPERTY.optionalNullString,
		url: SCHEMA_DEFINITION_PROPERTY.optionalNullString
	},
	GENERAL_SCHEMA_OPTIONS
);

export default websiteSchema;

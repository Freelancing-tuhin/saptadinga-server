import { Schema } from "mongoose";
import SCHEMA_DEFINITION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { IPage } from "../../ts/interfaces/cms.interface";

const pageSchema: Schema<IPage> = new Schema<IPage>(
	{
		websiteId: SCHEMA_DEFINITION_PROPERTY.requiredObjectId,
		name: SCHEMA_DEFINITION_PROPERTY.requiredString,
		slug: SCHEMA_DEFINITION_PROPERTY.requiredString,
		content: {
			type: Object,
			default: {}
		}
	},
	GENERAL_SCHEMA_OPTIONS
);

// Compound index to ensure page slug is unique per website
pageSchema.index({ websiteId: 1, slug: 1 }, { unique: true });

export default pageSchema;

import { Document, Types } from "mongoose";

export interface IWebsite extends Document {
	name: string;
	slug: string;
	description?: string;
	logo?: string;
	url?: string;
}

export interface IPage extends Document {
	websiteId: Types.ObjectId;
	name: string;
	slug: string;
	content: Record<string, any>;
}

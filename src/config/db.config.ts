import mongoose from "mongoose";
import config from "./config";
import { logger } from "../utils/logger";

const connectDb = async (): Promise<void> => {
	mongoose.set("strictQuery", true);

	await mongoose.connect(config.db.uri, {
		serverSelectionTimeoutMS: config.db.serverSelectionTimeoutMS
	});

	logger.info(`MongoDB connected (${config.env})`);
};

export const disconnectDb = async (): Promise<void> => {
	await mongoose.connection.close();
	logger.info("MongoDB connection closed");
};

export default connectDb;

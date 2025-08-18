/* eslint-disable quotes */
import mongoose from "mongoose";
import { NODE_ENV } from "./config";

console.log("NODE_ENV", String(NODE_ENV));

const mongoURI = "mongodb+srv://tuhinthakur1233:DY2p354LuqgXPef0@cluster0.r5uuwtr.mongodb.net/Saptadinga";

const connectDb = async () => {
	try {
		if (mongoURI) {
			const conn = await mongoose.connect(mongoURI, {
				serverSelectionTimeoutMS: 40000
			});
			console.log(`\x1b[34m \x1b[1m \x1b[4mMongoDB Connected\x1b[0m`);
		}
	} catch (err) {
		throw err;
	}
};
export default connectDb;

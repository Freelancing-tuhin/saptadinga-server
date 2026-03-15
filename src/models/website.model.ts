import { model } from "mongoose";
import { IWebsite } from "../ts/interfaces/cms.interface";
import websiteSchema from "./shcemaDefinations/website.schema";

const WebsiteModel = model<IWebsite>("websites", websiteSchema);

export default WebsiteModel;

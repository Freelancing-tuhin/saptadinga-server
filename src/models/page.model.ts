import { model } from "mongoose";
import { IPage } from "../ts/interfaces/cms.interface";
import pageSchema from "./shcemaDefinations/page.schema";

const PageModel = model<IPage>("pages", pageSchema);

export default PageModel;

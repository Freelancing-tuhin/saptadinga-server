import { Document } from "mongoose";

export interface IActivitySchema extends Document {
  name: string;
  description: string;
  duration: number; 
  price: number;
}

// File: interfaces/resort.interface.ts
import { Document } from "mongoose";

export interface IResortSchema extends Document {
  name: string;
  location: string;
  description: string;
  rating: number;
  rooms: string[]; 
  activities: string[];
}

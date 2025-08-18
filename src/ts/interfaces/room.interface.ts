// File: interfaces/room.interface.ts
import { Document } from "mongoose";

export interface IRoomSchema extends Document {
  name: string;
  type: string;
  description: string;
  capacity: number;
  price: number;
  // Add more fields as needed
}

import { Document } from "mongoose";
import { Request } from "express";
import { Types } from "mongoose";

export interface UserDocument extends Document {
  fullName: string;
  email: string;
  password: string;
  address: string;
  age : number;
  contact : string;
}

export interface AuthUser {
  _id: Types.ObjectId;
  userName?: string;
  userEmail?: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

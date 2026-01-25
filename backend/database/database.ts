import express from 'express';
import mongoose,{Schema,Document,Types} from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const connection_string_atlas = process.env.MONGODB_CONNECTION_STRING || "Failed to connect";


// Types for User Schema

interface UserTypes extends Document {
  fullName: string;
  email: string;
  barangay: string;
  password: string;
}


const userSchema = new Schema<UserTypes>({
  fullName: {type:String,required:true},
  email: {type:String,required:true},
  barangay: {type:String,required:true},
  password: {type:String,required:true},
})

export const User = mongoose.model<UserTypes>("User",userSchema);


export const connectDB = async () => {
  try {
       await mongoose.connect(connection_string_atlas);
     
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
};
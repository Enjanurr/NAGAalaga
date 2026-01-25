import mongoose,{ Schema, model } from "mongoose";
import dotenv from "dotenv";
import { UserDocument } from "../src/types/userTypes";

dotenv.config();


const connection_string_atlas = process.env.MONGODB_CONNECTION_STRING || "Failed to connect";

const userSchema = new Schema<UserDocument>({
    fullName:{
        type:String,
        required:[true,"FullName is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    address:{
        type:String,
        required:[true,"Address is required"]
    },
    age:{
        type: Number,
        required:[true,"Age is required"]
    },
    contact:{
        type:String,
        required:[true,"Contact is required"]
    },
})

export const User = model<UserDocument>("User", userSchema);

export const connectDB = async() =>{
    try{
      await mongoose.connect(connection_string_atlas);
    }catch(error){
        console.log("Database Failed to Connect", error);
        process.exit(1);
    }
}
import mongoose, { Schema, model } from "mongoose";
import dotenv from "dotenv";
import { UserDocument } from "../src/types/userTypes";

dotenv.config();

const connection_string_atlas = process.env.MONGODB_CONNECTION_STRING || "Failed to connect";

/* -------------------- User Schema -------------------- */
const userSchema = new Schema<UserDocument>({
  fullName: {
    type: String,
    required: [true, "FullName is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  contact: {
    type: String,
    required: [true, "Contact is required"],
  },
});

/* -------------------- Triage Schema -------------------- */


    interface TriageDocument extends mongoose.Document {
  symptomsOriginal: string;       // patient input in native language
  languageDetected: string;       // detected language
  symptomsEnglish: string;        // AI-translated to English
  aiResult: {
    status: "SAFE" | "MONITOR" | "EMERGENCY";
    message: string;              // English for doctor
    advice: string;               // English advice
    messageNative?: string;       // translated back for patient
    adviceNative?: string;        // translated back for patient
  };
  doctorConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const triageSchema = new Schema<TriageDocument>(
  {
    symptomsOriginal: { type: String, required: true },
    languageDetected: { type: String, required: true },
    symptomsEnglish: { type: String, required: true },

    aiResult: {
      status: {
        type: String,
        enum: ["SAFE", "MONITOR", "EMERGENCY"],
        required: true,
      },
      message: { type: String, required: true },       // English
      advice: { type: String, required: true },        // English

      messageNative: { type: String }, // filled AFTER confirm
      adviceNative: { type: String },  // filled AFTER confirm
    },

    doctorConfirmed: { type: Boolean, default: false },
  },
  { timestamps: true }
);




/* -------------------- Exports -------------------- */
export const User = model<UserDocument>("User", userSchema);
export const Triage = model<TriageDocument>("Triage", triageSchema);


/* -------------------- DB Connection -------------------- */
export const connectDB = async () => {
  try {
    await mongoose.connect(connection_string_atlas);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Database Failed to Connect", error);
    process.exit(1);
  }
};

import express, { Request, Response } from "express";
import { connectDB } from "../database/database";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import routes from "../routes";

dotenv.config();

const port = 8080;
const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PATCH'],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// Logger to debug requests
app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

// Routes
app.use("/api", routes);

// Test routes
app.get("/", (req: Request, res: Response) => res.send("Express + TS server lol"));
app.get("/ping", (req, res) => {
  console.log("🔥 PING hit");
  res.json({ ok: true });
});

// Start server
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);

  try {
    await connectDB();
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.warn("DB connection failed, continuing without DB", err);
  }
});

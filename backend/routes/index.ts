import express from "express";
import authRoutes from "./authRoutes"
import geminiRoutes from './geminiRoute'
import translationRoutes from './translationRoutes'
const router = express.Router();


router.use("/auth", authRoutes)
router.use("/triage",geminiRoutes);
router.use("/Ai",translationRoutes);

export default router;
import authRoutes from "./authRoutes";
import express from 'express';

const router = express.Router();


router.use("/auth",authRoutes);
export default router
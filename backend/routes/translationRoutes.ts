import express from "express";
import { getLatestTriageForDoctor, getLatestTriageForPatient,confirmTriage } from "../controllers/translation";
const router = express.Router();

router.get("/translate",getLatestTriageForDoctor);
router.get("/confirmed", getLatestTriageForPatient);
router.patch("/confirmDoctor", confirmTriage);
export default router;
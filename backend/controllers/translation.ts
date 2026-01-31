import { Request, Response } from "express";
import { Triage } from "../database/database";

/* ---------- Get latest triage for Doctor (English only) ---------- */
export const getLatestTriageForDoctor = async (req: Request, res: Response) => {
  try {
    const triage = await Triage.findOne().sort({ createdAt: -1 });

    if (!triage) return res.status(404).json({ error: "No triage found" });

    console.log(triage); // 🔥 Add this to see the output
    res.json(triage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch triage" });
  }
};


/* ---------- Get latest triage for Patient (Native only) ---------- */
export const getLatestTriageForPatient = async (req: Request, res: Response) => {
  try {
    const triage = await Triage.findOne({ doctorConfirmed: true }).sort({ createdAt: -1 });

    if (!triage)
      return res.status(404).json({ status: "WAITING", message: "Doctor has not confirmed yet" });

    // Only send native fields to patient
   res.json({
  doctorConfirmed: triage.doctorConfirmed,
  aiResult: {
    status: triage.aiResult.status,
    message: triage.aiResult.messageNative, // Bicolano message
    advice: triage.aiResult.adviceNative    // Bicolano advice
  },
  createdAt: triage.createdAt
});

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch triage" });
  }
};

export const confirmTriage = async (req: Request, res: Response) => {
   console.log("BODY:", req.body); 
  try {
    const { triageId } = req.body;

    if (!triageId) return res.status(400).json({ error: "Triage ID is required" });

    const triage = await Triage.findByIdAndUpdate(
      triageId,
      { doctorConfirmed: true },
      { new: true }
    );

    if (!triage) return res.status(404).json({ error: "Triage not found" });

    res.json({ message: "Doctor confirmed", triage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to confirm triage(l0l)" });
  }
};

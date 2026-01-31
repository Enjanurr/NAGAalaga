import { GoogleGenAI } from "@google/genai";
import { Request, Response } from "express";
import { Triage } from "../database/database";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const triageSymptoms = async (req: Request, res: Response) => {
  try {
    const { symptoms } = req.body;
    if (!symptoms) return res.status(400).json({ error: "Symptoms are required" });

    /* ---------- 1️⃣ Language Detection + Translate to English ---------- */
    const translationResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
Detect the language of the following text and translate it to English:

"${symptoms}"

Respond strictly in JSON:
{
  "languageDetected": "language name",
  "translatedText": "text in English"
}
      `,
    });

    if (!translationResponse.text) {
      return res.status(500).json({ error: "Empty translation response" });
    }

    const translationRaw = translationResponse.text.replace(/```json|```/g, "").trim();
    const translation = JSON.parse(translationRaw);

    /* ---------- 2️⃣ AI Triage in English ---------- */
    const triagePrompt = `
You are Bicol-First Smart Triage AI.
The user is a pregnant mother.

Analyze the following symptoms and classify into exactly ONE:

SAFE
MONITOR
EMERGENCY

Also provide short advice.

Respond strictly in JSON:

{
  "status": "SAFE | MONITOR | EMERGENCY",
  "message": "short explanation",
  "advice": "clear next steps"
}

Symptoms:
${translation.translatedText}
    `;

    const triageResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: triagePrompt,
    });

    if (!triageResponse.text) {
      return res.status(500).json({ error: "Empty triage response" });
    }

    const triageRaw = triageResponse.text.replace(/```json|```/g, "").trim();
    const aiResult = JSON.parse(triageRaw);
    aiResult.status = aiResult.status.trim().toUpperCase();

    /* ---------- 3️⃣ Translate AI result to Native Language ---------- */
    const nativeTranslationPrompt = `
Translate the following English text into the user's native language (${translation.languageDetected}) in a concise, natural way.

Message: "${aiResult.message}"
Advice: "${aiResult.advice}"

Respond strictly in JSON:
{
  "messageNative": "translated message",
  "adviceNative": "translated advice"
}
    `;

    const nativeTranslationResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: nativeTranslationPrompt,
    });

    let messageNative = "";
    let adviceNative = "";

    if (nativeTranslationResponse.text) {
      const nativeRaw = nativeTranslationResponse.text.replace(/```json|```/g, "").trim();
      try {
        const nativeParsed = JSON.parse(nativeRaw);
        messageNative = nativeParsed.messageNative || "";
        adviceNative = nativeParsed.adviceNative || "";
      } catch (err) {
        console.warn("Failed to parse native translation:", err);
      }
    }

    /* ---------- 4️⃣ Store in DB ---------- */
    const triageRecord = await Triage.create({
      symptomsOriginal: symptoms,
      languageDetected: translation.languageDetected,
      symptomsEnglish: translation.translatedText,
      aiResult: {
        status: aiResult.status,
        message: aiResult.message,
        advice: aiResult.advice,
        messageNative,
        adviceNative,
      },
      doctorConfirmed: false,
    });

    res.json({
      message: "AI triage completed. Waiting for doctor confirmation.",
      appointmentId: triageRecord._id,
      aiResult: triageRecord.aiResult, // send AI result immediately for frontend display
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI triage failed" });
  }
};

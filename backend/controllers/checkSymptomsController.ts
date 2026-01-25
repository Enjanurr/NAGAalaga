import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
This is a maternal health app that helps parents, especially mothers, through an AI-powered feature called “Bicol-First Smart Triage”.

The app is designed to understand Bicol Naga, Tagalog, and English, allowing mothers to describe their symptoms naturally and comfortably. For example, a mother can say “Masakit ang puson ko” or “Nahihilo ako simula kahapon” without needing medical terms.

The AI analyzes the symptoms and categorizes the situation into three levels:
Green (Safe) – normal symptoms with basic care advice,
Yellow (Monitor) – symptoms that need observation and follow-up,
Red (Emergency) – urgent symptoms that require immediate medical attention.

This system helps mothers decide what to do next quickly and safely, reducing panic and uncertainty. By supporting local language and natural speech, the app removes language barriers that often prevent mothers from seeking early medical guidance, making maternal healthcare more inclusive, accessible, and responsive.
    `,
  });

  console.log(response.text);
}

main();

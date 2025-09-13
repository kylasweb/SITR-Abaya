"use server";

import { ai } from "@/ai/genkit";

type ActionResult = {
  success: boolean;
  message: string;
  content?: string | null;
};

async function performAiAction(prompt: string): Promise<ActionResult> {
  try {
    const { text } = await ai.generate({ prompt });

    if (!text) {
      return { success: false, message: "The AI did not return any content." };
    }

    return { success: true, message: "Success", content: text };
  } catch (error: any) {
    console.error("AI Action Error:", error);
    let message = "An unexpected error occurred during AI generation.";
    // Check for specific Google AI API errors (like 'failed precondition')
    if (error.message && error.message.includes("precondition")) {
      message = "AI generation failed. Please ensure the 'Generative Language API' is enabled in your Google Cloud project and that billing is active.";
    }
    return { success: false, message: message };
  }
}

export async function generateContentAction(prompt: string): Promise<ActionResult> {
  return performAiAction(prompt);
}

export async function suggestContentAction(prompt: string): Promise<ActionResult> {
  return performAiAction(prompt);
}

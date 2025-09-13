
'use server';

import { ai } from '@/ai/genkit';

type ActionResult = {
  success: boolean;
  message: string;
  content?: string;
};

// A helper function to process errors and provide more helpful messages.
function handleAIError(error: unknown): { message: string } {
    console.error('AI action failed:', error);
    let errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    
    // Check for specific "failed precondition" error from Google AI services.
    if (typeof errorMessage === 'string' && errorMessage.toLowerCase().includes('failed precondition')) {
        errorMessage = "AI suggestion failed. This is often because the 'Generative Language API' (generativelanguage.googleapis.com) is not enabled in your Google Cloud project. Please make sure billing is enabled for your project and that this API is active.";
    }

    return { message: errorMessage };
}


export async function generateContentAction(prompt: string): Promise<ActionResult> {
  if (!prompt) {
    return { success: false, message: 'Prompt is required.' };
  }
  try {
    const { text } = await ai.generate({
      model: ai.model,
      prompt: prompt,
    });
    return { success: true, message: 'Content generated successfully.', content: text };
  } catch (error) {
    const { message } = handleAIError(error);
    return { success: false, message };
  }
}

export async function suggestContentAction(prompt: string): Promise<ActionResult> {
    if (!prompt) {
        return { success: false, message: 'Prompt for suggestion is required.' };
    }
    try {
        const { text } = await ai.generate({
            model: ai.model,
            prompt: prompt,
        });
        return { success: true, message: 'Suggestion generated successfully.', content: text };
    } catch (error) {
        const { message } = handleAIError(error);
        return { success: false, message };
    }
}

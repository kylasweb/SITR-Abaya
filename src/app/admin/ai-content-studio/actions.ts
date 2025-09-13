
'use server';

import { ai } from '@/ai/genkit';
import { generate } from 'genkit';

type ActionResult = {
  success: boolean;
  message: string;
  content?: string;
};

export async function generateContentAction(prompt: string): Promise<ActionResult> {
  if (!prompt) {
    return { success: false, message: 'Prompt is required.' };
  }
  try {
    const { text } = await generate({
      model: ai.model,
      prompt: prompt,
    });
    return { success: true, message: 'Content generated successfully.', content: text };
  } catch (error) {
    console.error('AI content generation failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, message: errorMessage };
  }
}

export async function suggestContentAction(prompt: string): Promise<ActionResult> {
    if (!prompt) {
        return { success: false, message: 'Prompt for suggestion is required.' };
    }
    try {
        const { text } = await generate({
            model: ai.model,
            prompt: prompt,
        });
        return { success: true, message: 'Suggestion generated successfully.', content: text };
    } catch (error) {
        console.error('AI suggestion generation failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, message: errorMessage };
    }
}

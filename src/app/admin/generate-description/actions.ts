'use server';

import { generateProductDescription } from '@/ai/flows/generate-product-description';

export type FormState = {
  message: string;
  description: string;
  timestamp: number;
};

export async function generateDescriptionAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const keywords = formData.get('keywords') as string;
  const summary = formData.get('summary') as string;

  if (!keywords) {
    return { 
      message: 'Keywords are required to generate a description.',
      description: '',
      timestamp: Date.now()
    };
  }

  try {
    const result = await generateProductDescription({ keywords, summary });
    if (result.description) {
        return {
          message: 'success',
          description: result.description,
          timestamp: Date.now()
        };
    } else {
        return {
          message: 'The AI could not generate a description. Please try refining your keywords.',
          description: '',
          timestamp: Date.now()
        };
    }
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
      description: '',
      timestamp: Date.now()
    };
  }
}

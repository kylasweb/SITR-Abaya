// The directive tells the Next.js runtime that it should only be executed on the server.
'use server';

/**
 * @fileOverview Product description AI agent.
 *
 * - generateProductDescription - A function that handles the product description generation process.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  keywords: z
    .string()
    .describe(
      'Keywords describing the abaya, such as color, style, material, and any unique features.'
    ),
  summary: z
    .string()
    .describe(
      'A brief summary of the abaya, including its design inspiration and target audience.'
    )
    .optional(),
});
export type GenerateProductDescriptionInput = z.infer<
  typeof GenerateProductDescriptionInputSchema
>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A compelling and detailed product description for the abaya.'),
});
export type GenerateProductDescriptionOutput = z.infer<
  typeof GenerateProductDescriptionOutputSchema
>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert copywriter specializing in creating luxurious product descriptions for abayas.

  Based on the provided keywords and summary, generate a compelling and detailed product description that highlights the abaya's unique features, design inspiration, and target audience. Focus on attracting customers with a sense of elegance and sophistication.

  Keywords: {{{keywords}}}
  Summary: {{{summary}}}

  Product Description:`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

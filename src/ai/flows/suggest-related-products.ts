'use server';

/**
 * @fileOverview A flow for suggesting related products based on a user's browsing history or current product view.
 *
 * - suggestRelatedProducts - A function that suggests related products.
 * - SuggestRelatedProductsInput - The input type for the suggestRelatedProducts function.
 * - SuggestRelatedProductsOutput - The return type for the suggestRelatedProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelatedProductsInputSchema = z.object({
  productId: z.string().describe('The ID of the current product being viewed or a previously purchased product.'),
  browsingHistory: z.array(z.string()).optional().describe('An array of product IDs representing the user\'s browsing history.'),
  purchaseHistory: z.array(z.string()).optional().describe('An array of product IDs representing the user\'s purchase history.'),
  wishlist: z.array(z.string()).optional().describe('An array of product IDs representing the user\'s wishlist.'),
});
export type SuggestRelatedProductsInput = z.infer<typeof SuggestRelatedProductsInputSchema>;

const SuggestRelatedProductsOutputSchema = z.object({
  relatedProductIds: z.array(z.string()).describe('An array of product IDs that are related to the input product and user history.'),
});
export type SuggestRelatedProductsOutput = z.infer<typeof SuggestRelatedProductsOutputSchema>;

export async function suggestRelatedProducts(input: SuggestRelatedProductsInput): Promise<SuggestRelatedProductsOutput> {
  return suggestRelatedProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelatedProductsPrompt',
  input: {schema: SuggestRelatedProductsInputSchema},
  output: {schema: SuggestRelatedProductsOutputSchema},
  prompt: `You are an expert in product recommendations for abayas. Given a product ID, browsing history, purchase history and wishlist, you will suggest related product IDs.

Current Product ID: {{{productId}}}
Browsing History: {{#if browsingHistory}}{{#each browsingHistory}}{{{this}}}, {{/each}}{{else}}None{{/if}}
Purchase History: {{#if purchaseHistory}}{{#each purchaseHistory}}{{{this}}}, {{/each}}{{else}}None{{/if}}
Wishlist: {{#if wishlist}}{{#each wishlist}}{{{this}}}, {{/each}}{{else}}None{{/if}}

Based on this information, suggest an array of related product IDs. Return only an array of product IDs. Ensure that the product IDs are strings.

Example Output:
{
  "relatedProductIds": ["abaya123", "abaya456", "abaya789"]
}
`,
});

const suggestRelatedProductsFlow = ai.defineFlow(
  {
    name: 'suggestRelatedProductsFlow',
    inputSchema: SuggestRelatedProductsInputSchema,
    outputSchema: SuggestRelatedProductsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

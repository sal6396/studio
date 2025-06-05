'use server';

/**
 * @fileOverview Blog content generation flow.
 *
 * - generateBlogContent - A function that generates multiple blog content variations based on a single prompt.
 * - GenerateBlogContentInput - The input type for the generateBlogContent function.
 * - GenerateBlogContentOutput - The output type for the generateBlogContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogContentInputSchema = z.object({
  prompt: z.string().describe('The prompt for generating blog content.'),
  numVariations: z
    .number()
    .default(3)
    .describe('The number of blog content variations to generate.'),
});
export type GenerateBlogContentInput = z.infer<typeof GenerateBlogContentInputSchema>;

const GenerateBlogContentOutputSchema = z.object({
  variations: z.array(z.string()).describe('The generated blog content variations.'),
});
export type GenerateBlogContentOutput = z.infer<typeof GenerateBlogContentOutputSchema>;

export async function generateBlogContent(input: GenerateBlogContentInput): Promise<GenerateBlogContentOutput> {
  return generateBlogContentFlow(input);
}

const generateBlogContentPrompt = ai.definePrompt({
  name: 'generateBlogContentPrompt',
  input: {schema: GenerateBlogContentInputSchema},
  output: {schema: z.string()}, // Expects a string
  prompt: `You are an expert content writer specializing in creating SEO-optimized blog posts.

  Based on the following prompt, generate a blog post:

  Prompt: {{{prompt}}}

  Make sure the content is engaging, informative, and optimized for search engines.`,
});

const generateBlogContentFlow = ai.defineFlow(
  {
    name: 'generateBlogContentFlow',
    inputSchema: GenerateBlogContentInputSchema,
    outputSchema: GenerateBlogContentOutputSchema,
  },
  async input => {
    const variations: string[] = []; // Explicitly type as string array
    for (let i = 0; i < input.numVariations; i++) {
      try {
        const { output } = await generateBlogContentPrompt(input);
        // If generateBlogContentPrompt resolves and output.schema is z.string(),
        // 'output' should be a string.
        // An error would have been thrown by Genkit if the LLM response (e.g. null)
        // failed validation against z.string().
        if (typeof output === 'string') {
          variations.push(output);
        } else {
          // This case would be unexpected if Genkit's z.string() validation is strict for non-null.
          // Logging it helps identify if such a scenario occurs.
          console.warn(`Variation ${i + 1} generation attempt did not yield a string. Received:`, output);
        }
      } catch (error) {
        // This block catches errors, including schema validation errors from Genkit
        // if the LLM response (e.g., null) doesn't match the z.string() schema.
        console.error(`Error generating blog content for variation ${i + 1}:`, error);
        // This variation failed. The loop will continue to try and generate other variations.
        // The final 'variations' array might have fewer items than input.numVariations.
        // The client-side already handles cases where no variations are returned.
      }
    }
    return {variations};
  }
);

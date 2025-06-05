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
  output: {schema: z.string()},
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
    const variations = [];
    for (let i = 0; i < input.numVariations; i++) {
      const {output} = await generateBlogContentPrompt(input);
      variations.push(output!);
    }
    return {variations};
  }
);

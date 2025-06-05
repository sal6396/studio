// src/app/actions/blogActions.ts
"use server";

import { generateBlogContent, type GenerateBlogContentInput, type GenerateBlogContentOutput } from "@/ai/flows/generate-blog-content";
import { z } from "zod";

const BlogGenerationSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters long."),
  numVariations: z.coerce.number().min(1).max(5).default(3),
});

export interface BlogGenerationFormState {
  message: string | null;
  fields?: Record<string, string>;
  issues?: string[];
  data?: GenerateBlogContentOutput | null;
}

export async function handleGenerateBlogContent(
  prevState: BlogGenerationFormState,
  formData: FormData
): Promise<BlogGenerationFormState> {
  const rawFormData = {
    prompt: formData.get("prompt"),
    numVariations: formData.get("numVariations"),
  };

  const validatedFields = BlogGenerationSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const issues = validatedFields.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);
    return {
      message: "Invalid form data. Please check the fields.",
      fields: rawFormData as Record<string, string>,
      issues,
      data: null,
    };
  }

  try {
    const input: GenerateBlogContentInput = {
      prompt: validatedFields.data.prompt,
      numVariations: validatedFields.data.numVariations,
    };

    const output = await generateBlogContent(input);

    if (!output || !output.variations || output.variations.length === 0) {
      return { message: "AI failed to generate content. Please try a different prompt.", data: null };
    }
    
    return { message: "Blog content generated successfully!", data: output };

  } catch (error) {
    console.error("Error generating blog content:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { message: `Error generating content: ${errorMessage}`, data: null };
  }
}

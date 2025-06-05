
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/constants"; // Assuming BlogPost type is exported

const blogPostFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug must be lowercase alphanumeric with hyphens." }),
  category: z.string().min(2, { message: "Category must be at least 2 characters." }),
  author: z.string().min(2, { message: "Author name must be at least 2 characters." }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in YYYY-MM-DD format." }),
  excerpt: z.string().min(10, { message: "Excerpt must be at least 10 characters." }),
  content: z.string().min(20, { message: "Content must be at least 20 characters." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }).optional().or(z.literal('')),
  imageHint: z.string().max(30, { message: "Image hint should be brief (max 30 chars)." }).optional().or(z.literal('')),
});

export type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;

interface AddBlogPostFormProps {
  postToEdit?: BlogPost;
  formAction: "add" | "edit";
}

export function AddBlogPostForm({ postToEdit, formAction }: AddBlogPostFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<BlogPostFormValues> = postToEdit
    ? {
        ...postToEdit,
      }
    : {
        title: "",
        slug: "",
        category: "",
        author: "Alif InfoTech Team", // Default author
        date: new Date().toISOString().split('T')[0], // Default to today's date
        excerpt: "",
        content: "",
        imageUrl: "",
        imageHint: "",
      };

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues,
  });

  // Function to generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-'); // Replace multiple - with single -
  };

  async function onSubmit(data: BlogPostFormValues) {
    setIsSubmitting(true);
    
    const processedData = {
      ...data,
      // Slug is already handled by the form field with auto-generation option
    };

    console.log(`${formAction === "add" ? "New" : "Updated"} Blog Post Data:`, processedData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: `Blog Post ${formAction === "add" ? "Added" : "Updated"}!`,
      description: `The post "${data.title}" has been successfully ${formAction === "add" ? "added" : "updated"}. (This is a demo)`,
    });
    setIsSubmitting(false);

    if (formAction === "add") {
      form.reset(); // Reset form after adding
    }
    // router.push("/admin/blog"); // Optionally redirect
  }
  
  const currentTitle = form.watch("title");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., The Future of AI" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Slug</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input placeholder="e.g., future-of-ai" {...field} />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => field.onChange(generateSlug(currentTitle || ''))}
                    disabled={!currentTitle}
                  >
                    Generate from Title
                  </Button>
                </div>
              </FormControl>
              <FormDescription>Lowercase, use hyphens for spaces. Auto-generated from title or manually set.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Technology" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date (YYYY-MM-DD)</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="YYYY-MM-DD" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt / Short Summary</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief summary of the blog post..." className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Content (Markdown/HTML supported on frontend)</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your blog post content here. You can use Markdown or HTML..." className="min-h-[250px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Featured Image URL (Optional)</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://placehold.co/800x400.png" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageHint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image AI Hint (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., abstract technology" {...field} />
                </FormControl>
                <FormDescription>Keywords for AI image search (max 2 words, 30 chars).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {formAction === "add" ? "Publishing..." : "Updating..."}
            </>
          ) : (
            formAction === "add" ? "Publish Post" : "Update Post"
          )}
        </Button>
      </form>
    </Form>
  );
}


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
import { useRouter } from "next/navigation"; // For redirecting

const addServiceFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters." })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug must be lowercase alphanumeric with hyphens." }),
  description: z.string().min(10, { message: "Short description must be at least 10 characters." }),
  iconName: z.string().min(2, { message: "Icon name must be at least 2 characters (e.g., Smartphone, Globe)." }),
  longDescription: z.string().min(20, { message: "Long description must be at least 20 characters." }),
  keyFeatures: z.string().min(10, { message: "Provide at least one key feature (comma-separated)." }),
  imagePath: z.string().url({ message: "Please enter a valid URL for the image." }).optional().or(z.literal('')),
  imageHint: z.string().optional(),
});

type AddServiceFormValues = z.infer<typeof addServiceFormSchema>;

export function AddServiceForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddServiceFormValues>({
    resolver: zodResolver(addServiceFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      iconName: "",
      longDescription: "",
      keyFeatures: "",
      imagePath: "",
      imageHint: "",
    },
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

  async function onSubmit(data: AddServiceFormValues) {
    setIsSubmitting(true);
    console.log("New Service Data:", data);
    // In a real app, you would send this data to your backend API
    // For now, we just simulate a delay and show a toast
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Service Submitted!",
      description: "The new service data has been logged. (This is a demo)",
    });
    setIsSubmitting(false);
    // Optionally, reset the form or redirect
    // form.reset(); 
    // router.push("/admin/services"); // Redirect back to services list
  }

  const currentTitle = form.watch("title");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Web Development" {...field} />
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
                <FormLabel>Service Slug</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input placeholder="e.g., web-development" {...field} />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => field.onChange(generateSlug(currentTitle || ''))}
                      disabled={!currentTitle}
                    >
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>Lowercase, use hyphens for spaces (e.g., mobile-app-dev).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description (for cards)</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief summary of the service..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="iconName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Smartphone (from Lucide Icons)" {...field} />
              </FormControl>
              <FormDescription>Enter the name of a Lucide React icon (e.g., Globe, Palette).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="longDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed Description (for service page)</FormLabel>
              <FormControl>
                <Textarea placeholder="A full description of the service, its benefits, and processes." className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="keyFeatures"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Features (comma-separated)</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Native iOS & Android, Cross-Platform, UI/UX Design" {...field} />
              </FormControl>
              <FormDescription>Enter key features separated by commas.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="imagePath"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Image Path (URL)</FormLabel>
                <FormControl>
                    <Input type="url" placeholder="https://placehold.co/1200x600.png" {...field} />
                </FormControl>
                <FormDescription>Optional: URL for the service's main image.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="imageHint"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Image AI Hint</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., mobile app interface" {...field} />
                </FormControl>
                <FormDescription>Optional: Keywords for AI image search (max 2 words).</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Add Service"
          )}
        </Button>
      </form>
    </Form>
  );
}

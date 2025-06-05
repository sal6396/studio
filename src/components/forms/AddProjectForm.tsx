
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
import type { Project } from "@/lib/constants"; // Assuming Project type is exported

const projectFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  category: z.string().min(2, { message: "Category must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  imageHint: z.string().max(30, { message: "Image hint should be brief (max 30 chars)." }).optional().or(z.literal('')),
  technologies: z.string().min(2, { message: "Please list at least one technology." }),
  clientTestimonial: z.string().optional().or(z.literal('')),
  clientName: z.string().optional().or(z.literal('')),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface AddProjectFormProps {
  projectToEdit?: Project; // Optional project data for editing
  formAction: "add" | "edit";
}

export function AddProjectForm({ projectToEdit, formAction }: AddProjectFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<ProjectFormValues> = projectToEdit
    ? {
        ...projectToEdit,
        technologies: projectToEdit.technologies.join(", "), // Convert array to comma-separated string
      }
    : {
        title: "",
        category: "",
        description: "",
        imageUrl: "",
        imageHint: "",
        technologies: "",
        clientTestimonial: "",
        clientName: "",
      };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  });

  async function onSubmit(data: ProjectFormValues) {
    setIsSubmitting(true);
    
    const processedData = {
      ...data,
      id: formAction === 'edit' && projectToEdit ? projectToEdit.id : `project-${Date.now()}`, // Generate new ID for add, use existing for edit
      technologies: data.technologies.split(",").map(tech => tech.trim()).filter(tech => tech), // Convert string to array
    };

    console.log(`${formAction === "add" ? "New" : "Updated"} Project Data:`, processedData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: `Project ${formAction === "add" ? "Added" : "Updated"}!`,
      description: `The project "${data.title}" has been successfully ${formAction === "add" ? "added" : "updated"}. (This is a demo)`,
    });
    setIsSubmitting(false);

    if (formAction === "add") {
      form.reset(); // Reset form after adding
    }
    // router.push("/admin/portfolio"); // Optionally redirect
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Awesome E-commerce App" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Web Development" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies Used (comma-separated)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., React, Node.js, TailwindCSS" {...field} />
                </FormControl>
                <FormDescription>Enter technologies separated by commas.</FormDescription>
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
              <FormLabel>Project Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A detailed description of the project..." className="min-h-[120px]" {...field} />
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
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://placehold.co/600x400.png" {...field} />
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
                  <Input placeholder="e.g., mobile app interface" {...field} />
                </FormControl>
                <FormDescription>Keywords for AI image search (max 2 words, 30 chars).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h3 className="text-lg font-medium pt-4 border-t">Client Testimonial (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., John Doe Inc." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="clientTestimonial"
            render={({ field }) => (
                <FormItem className="md:col-span-2">
                <FormLabel>Testimonial Text</FormLabel>
                <FormControl>
                    <Textarea placeholder="e.g., This project was a huge success..." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>


        <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {formAction === "add" ? "Adding..." : "Saving..."}
            </>
          ) : (
            formAction === "add" ? "Add Project" : "Save Changes"
          )}
        </Button>
      </form>
    </Form>
  );
}

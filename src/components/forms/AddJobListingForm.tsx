
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
import type { JobListing } from "@/lib/constants";
import { useRouter } from "next/navigation";

const jobListingFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  location: z.string().min(2, { message: "Location must be at least 2 characters." }),
  type: z.string().min(2, { message: "Job type must be at least 2 characters (e.g., Full-time)." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  responsibilities: z.string().min(10, { message: "Please list at least one responsibility." }),
  qualifications: z.string().min(10, { message: "Please list at least one qualification." }),
});

export type JobListingFormValues = z.infer<typeof jobListingFormSchema>;

interface AddJobListingFormProps {
  jobToEdit?: JobListing;
  formAction: "add" | "edit";
}

export function AddJobListingForm({ jobToEdit, formAction }: AddJobListingFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<JobListingFormValues> = jobToEdit
    ? {
        ...jobToEdit,
        responsibilities: jobToEdit.responsibilities.join("\n"),
        qualifications: jobToEdit.qualifications.join("\n"),
      }
    : {
        title: "",
        location: "Remote",
        type: "Full-time",
        description: "",
        responsibilities: "",
        qualifications: "",
      };

  const form = useForm<JobListingFormValues>({
    resolver: zodResolver(jobListingFormSchema),
    defaultValues,
  });

  async function onSubmit(data: JobListingFormValues) {
    setIsSubmitting(true);
    
    const processedData = {
      ...data,
      id: formAction === 'edit' && jobToEdit ? jobToEdit.id : `job-${Date.now()}`,
      responsibilities: data.responsibilities.split("\n").map(r => r.trim()).filter(r => r),
      qualifications: data.qualifications.split("\n").map(q => q.trim()).filter(q => q),
    };

    console.log(`${formAction === "add" ? "New" : "Updated"} Job Listing Data:`, processedData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: `Job Listing ${formAction === "add" ? "Added" : "Updated"}!`,
      description: `The job listing "${data.title}" has been successfully ${formAction === "add" ? "added" : "updated"}. (This is a demo)`,
    });
    setIsSubmitting(false);

    if (formAction === "add") {
      form.reset(); 
    }
    // router.push("/admin/jobs"); // Optionally redirect
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Senior Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Remote or City, State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Full-time, Part-time, Contract" {...field} />
                </FormControl>
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
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A summary of the role and company..." className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="responsibilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsibilities</FormLabel>
              <FormControl>
                <Textarea placeholder="List each responsibility on a new line..." className="min-h-[150px]" {...field} />
              </FormControl>
              <FormDescription>Enter each responsibility on a new line.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="qualifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qualifications</FormLabel>
              <FormControl>
                <Textarea placeholder="List each qualification on a new line..." className="min-h-[150px]" {...field} />
              </FormControl>
              <FormDescription>Enter each qualification on a new line.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {formAction === "add" ? "Adding Listing..." : "Updating Listing..."}
            </>
          ) : (
            formAction === "add" ? "Add Job Listing" : "Update Job Listing"
          )}
        </Button>
      </form>
    </Form>
  );
}

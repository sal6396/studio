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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JOB_LISTINGS_DATA } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const jobApplicationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  jobPosition: z.string().min(1, { message: "Please select the job position you are applying for." }),
  resume: z.any()
    .refine((files) => files?.length === 1, "Resume is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      ".pdf, .doc, .docx files are accepted."
    ).optional(), // Making resume optional for now to avoid browser File API complexities in this stage. Can be re-enabled.
  coverLetter: z.string().optional(),
});

type JobApplicationFormValues = z.infer<typeof jobApplicationFormSchema>;

interface JobApplicationFormProps {
  defaultJobId?: string;
}

export function JobApplicationForm({ defaultJobId }: JobApplicationFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<JobApplicationFormValues>({
    resolver: zodResolver(jobApplicationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      jobPosition: defaultJobId || "",
      coverLetter: "",
    },
  });

  async function onSubmit(data: JobApplicationFormValues) {
    setIsSubmitting(true);
    console.log("Job Application Submitted:", data);
    // In a real app, you'd handle file upload here
    // const formData = new FormData();
    // Object.entries(data).forEach(([key, value]) => {
    //   if (key === 'resume' && value instanceof FileList) {
    //     formData.append(key, value[0]);
    //   } else if (value !== undefined) {
    //     formData.append(key, String(value));
    //   }
    // });
    // await fetch('/api/apply', { method: 'POST', body: formData });
    
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    toast({
      title: "Application Sent!",
      description: "Thank you for applying. We will review your application and get back to you if you are shortlisted.",
    });
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl text-primary">Apply for a Position</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobPosition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Applying for Position</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a position" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {JOB_LISTINGS_DATA.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Resume Field (Currently simplified - no actual file upload state management) */}
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume/CV</FormLabel>
                  <FormControl>
                     {/* Using a standard input type file. For better UX, a custom component or library might be used. */}
                    <Input 
                      type="file" 
                      onChange={(e) => field.onChange(e.target.files)} // RHF expects FileList
                      accept=".pdf,.doc,.docx"
                    />
                  </FormControl>
                  <FormDescription>
                    Upload your resume (PDF, DOC, DOCX - Max 5MB). (Optional for this demo)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us why you're a great fit for this role and our company..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3" disabled={isSubmitting}>
               {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

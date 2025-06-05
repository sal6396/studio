
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
import { Loader2, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { COMPANY_NAME, CONTACT_DETAILS } from "@/lib/constants"; // For pre-filling

const companyInfoSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  companyAddress: z.string().min(5, { message: "Address must be at least 5 characters." }),
  companyPhone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  companyEmail: z.string().email({ message: "Please enter a valid email address." }),
});

const seoDefaultsSchema = z.object({
  siteTitle: z.string().min(5, { message: "Site title must be at least 5 characters." }),
  siteMetaDescription: z.string().min(10, { message: "Meta description must be at least 10 characters." }).max(160, { message: "Meta description should not exceed 160 characters." }),
});

// Union of schemas for type inference, actual validation will depend on section
const adminSettingsFormSchema = z.union([companyInfoSchema, seoDefaultsSchema]);
type AdminSettingsFormValues = z.infer<typeof companyInfoSchema> & z.infer<typeof seoDefaultsSchema>;


interface AdminSettingsFormProps {
  section: "companyInfo" | "seoDefaults";
}

export function AdminSettingsForm({ section }: AdminSettingsFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentSchema = section === "companyInfo" ? companyInfoSchema : seoDefaultsSchema;

  const form = useForm<AdminSettingsFormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      // Pre-fill from constants or use empty strings
      companyName: COMPANY_NAME || "",
      companyAddress: CONTACT_DETAILS.address || "",
      companyPhone: CONTACT_DETAILS.phone || "",
      companyEmail: CONTACT_DETAILS.email || "",
      siteTitle: `${APP_NAME} - Your Tagline Here` || "",
      siteMetaDescription: `Discover innovative solutions with ${APP_NAME}. We specialize in delivering cutting-edge technology to elevate your business.` || "",
    },
  });

  async function onSubmit(data: AdminSettingsFormValues) {
    setIsSubmitting(true);
    
    // Filter data based on the current section being saved
    let relevantData;
    if (section === "companyInfo") {
      relevantData = companyInfoSchema.parse(data);
    } else {
      relevantData = seoDefaultsSchema.parse(data);
    }

    console.log(`Admin Settings (${section}) Submitted:`, relevantData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Settings Updated!",
      description: `The ${section === "companyInfo" ? "Company Information" : "SEO Defaults"} have been successfully updated. (This is a demo)`,
    });
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {section === "companyInfo" && (
          <>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Company LLC" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="123 Main St, Anytown, USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1-555-123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contact@yourcompany.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        {section === "seoDefaults" && (
          <>
            <FormField
              control={form.control}
              name="siteTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Site Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Awesome Site Name" {...field} />
                  </FormControl>
                  <FormDescription>This is the default title that appears in browser tabs and search results.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="siteMetaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Meta Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A brief summary of your website for search engines..." className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormDescription>A concise summary (max 160 characters) for search engine results.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}


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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { TeamMember } from "@/lib/constants"; // Assuming TeamMember type is exported

const teamMemberFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.string().min(2, { message: "Role must be at least 2 characters (e.g., Developer)." }),
  avatarUrl: z.string().url({ message: "Please enter a valid URL for the avatar." }).optional().or(z.literal('')),
  avatarHint: z.string().max(30, { message: "Avatar hint should be brief (max 30 chars)." }).optional().or(z.literal('')),
});

export type TeamMemberFormValues = z.infer<typeof teamMemberFormSchema>;

interface AddTeamMemberFormProps {
  teamMemberToEdit?: TeamMember;
  formAction: "add" | "edit";
}

export function AddTeamMemberForm({ teamMemberToEdit, formAction }: AddTeamMemberFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<TeamMemberFormValues> = teamMemberToEdit
    ? { ...teamMemberToEdit }
    : {
        name: "",
        email: "",
        role: "",
        avatarUrl: "",
        avatarHint: "",
      };

  const form = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberFormSchema),
    defaultValues,
  });

  async function onSubmit(data: TeamMemberFormValues) {
    setIsSubmitting(true);
    
    const processedData = {
      ...data,
      id: formAction === 'edit' && teamMemberToEdit ? teamMemberToEdit.id : `tm-${Date.now()}`,
    };

    console.log(`${formAction === "add" ? "New" : "Updated"} Team Member Data:`, processedData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: `Team Member ${formAction === "add" ? "Added" : "Updated"}!`,
      description: `The team member "${data.name}" has been successfully ${formAction === "add" ? "added" : "updated"}. (This is a demo)`,
    });
    setIsSubmitting(false);

    if (formAction === "add") {
      form.reset(); 
    }
    // router.push("/admin/team"); // Optionally redirect
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Alice Wonderland" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="e.g., alice@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role / Position</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="avatarUrl"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Avatar URL (Optional)</FormLabel>
                <FormControl>
                    <Input type="url" placeholder="https://placehold.co/100x100.png" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="avatarHint"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Avatar AI Hint (Optional)</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., woman smiling" {...field} />
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
              {formAction === "add" ? "Adding Member..." : "Updating Member..."}
            </>
          ) : (
            formAction === "add" ? "Add Team Member" : "Update Team Member"
          )}
        </Button>
      </form>
    </Form>
  );
}

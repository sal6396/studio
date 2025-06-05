
"use client";

import { AddJobListingForm } from "@/components/forms/AddJobListingForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AddNewJobListingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/jobs">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Job Listings</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Briefcase className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Add New Job Listing</h1>
        </div>
      </div>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Job Listing Details</CardTitle>
          <CardDescription>Fill in the form below to create a new job listing.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddJobListingForm formAction="add" />
        </CardContent>
      </Card>
    </div>
  );
}

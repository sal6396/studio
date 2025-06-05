
"use client";

import { AddJobListingForm } from "@/components/forms/AddJobListingForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { JOB_LISTINGS_DATA, type JobListing } from "@/lib/constants";
import { ArrowLeft, AlertTriangle, Loader2, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditJobListingPage() {
  const params = useParams();
  const jobId = params.id as string;
  const [job, setJob] = useState<JobListing | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobId) {
      // Simulate fetching job data
      const foundJob = JOB_LISTINGS_DATA.find(j => j.id === jobId);
      setJob(foundJob);
      setLoading(false);
    }
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading job listing details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="space-y-6 text-center">
         <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="icon" asChild>
            <Link href="/admin/jobs">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Job Listings</span>
            </Link>
            </Button>
            <h1 className="text-3xl font-bold text-destructive">Job Listing Not Found</h1>
        </div>
        <Card className="shadow-xl max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center justify-center text-destructive">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    Error
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">The job listing with ID "{jobId}" could not be found.</p>
                <Button asChild className="mt-4">
                    <Link href="/admin/jobs">Return to Job Listings</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-primary">Edit Job Listing: {job.title}</h1>
        </div>
      </div>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Update Listing Details</CardTitle>
          <CardDescription>Modify the details for the job listing "{job.title}".</CardDescription>
        </CardHeader>
        <CardContent>
          <AddJobListingForm jobToEdit={job} formAction="edit" />
        </CardContent>
      </Card>
    </div>
  );
}

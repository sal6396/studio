
"use client";

import { AddProjectForm } from "@/components/forms/AddProjectForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PORTFOLIO_DATA, type Project } from "@/lib/constants"; // Make sure Project type is exported
import { ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      // Simulate fetching project data
      const foundProject = PORTFOLIO_DATA.find(p => p.id === projectId);
      setProject(foundProject);
      setLoading(false);
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading project details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="space-y-6 text-center">
         <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="icon" asChild>
            <Link href="/admin/portfolio">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Portfolio</span>
            </Link>
            </Button>
            <h1 className="text-3xl font-bold text-destructive">Project Not Found</h1>
        </div>
        <Card className="shadow-xl max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center justify-center text-destructive">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    Error
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">The project with ID "{projectId}" could not be found.</p>
                <Button asChild className="mt-4">
                    <Link href="/admin/portfolio">Return to Portfolio</Link>
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
          <Link href="/admin/portfolio">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Portfolio</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-primary">Edit Project: {project.title}</h1>
      </div>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Update Project Details</CardTitle>
          <CardDescription>Modify the details for the project "{project.title}".</CardDescription>
        </CardHeader>
        <CardContent>
          <AddProjectForm projectToEdit={project} formAction="edit" />
        </CardContent>
      </Card>
    </div>
  );
}

// Dummy Loader2 for skeleton state, replace or ensure it's imported if needed
const Loader2 = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

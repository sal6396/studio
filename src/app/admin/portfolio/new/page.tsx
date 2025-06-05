
"use client";

import { AddProjectForm } from "@/components/forms/AddProjectForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AddNewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/portfolio">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Portfolio</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-primary">Add New Project</h1>
      </div>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Fill in the form below to add a new project to your portfolio.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddProjectForm formAction="add" />
        </CardContent>
      </Card>
    </div>
  );
}

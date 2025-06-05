
"use client";

import { AddBlogPostForm } from "@/components/forms/AddBlogPostForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AddNewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/blog">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Blog Posts</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-primary">Add New Blog Post</h1>
      </div>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Blog Post Details</CardTitle>
          <CardDescription>Fill in the form below to create a new blog post.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddBlogPostForm formAction="add" />
        </CardContent>
      </Card>
    </div>
  );
}

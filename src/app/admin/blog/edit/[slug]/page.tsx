
"use client";

import { AddBlogPostForm } from "@/components/forms/AddBlogPostForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BLOG_POSTS_DATA, type BlogPost } from "@/lib/constants";
import { ArrowLeft, AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditBlogPostPage() {
  const params = useParams();
  const postSlug = params.slug as string;
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postSlug) {
      // Simulate fetching post data
      const foundPost = BLOG_POSTS_DATA.find(p => p.slug === postSlug);
      setPost(foundPost);
      setLoading(false);
    }
  }, [postSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading post details...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="space-y-6 text-center">
         <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="icon" asChild>
            <Link href="/admin/blog">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Blog Posts</span>
            </Link>
            </Button>
            <h1 className="text-3xl font-bold text-destructive">Blog Post Not Found</h1>
        </div>
        <Card className="shadow-xl max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center justify-center text-destructive">
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    Error
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">The blog post with slug "{postSlug}" could not be found.</p>
                <Button asChild className="mt-4">
                    <Link href="/admin/blog">Return to Blog Posts</Link>
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
          <Link href="/admin/blog">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Blog Posts</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-primary">Edit Blog Post: {post.title}</h1>
      </div>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Update Post Details</CardTitle>
          <CardDescription>Modify the details for the blog post "{post.title}".</CardDescription>
        </CardHeader>
        <CardContent>
          <AddBlogPostForm postToEdit={post} formAction="edit" />
        </CardContent>
      </Card>
    </div>
  );
}

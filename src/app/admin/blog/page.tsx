
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Manage Blog</h1>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Placeholder for blog management (Create/Edit/Delete blog posts).</p>
          {/* Future: Table or list of blog posts will go here */}
        </CardContent>
      </Card>
    </div>
  );
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPortfolioPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Manage Portfolio</h1>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Projects List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Placeholder for portfolio/projects management (Add/Edit/Delete projects).</p>
          {/* Future: Table or list of projects will go here */}
        </CardContent>
      </Card>
    </div>
  );
}

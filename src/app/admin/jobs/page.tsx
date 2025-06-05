
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminJobApplicationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Manage Job Applications</h1>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Applications List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Placeholder for job applications management.</p>
          {/* Future: Table or list of applications will go here */}
        </CardContent>
      </Card>
    </div>
  );
}

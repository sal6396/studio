
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminTeamPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Manage Team</h1>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Placeholder for team management (Add/Edit/Delete team members).</p>
          {/* Future: Table or list of team members will go here */}
        </CardContent>
      </Card>
    </div>
  );
}

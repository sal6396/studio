
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminServicesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Manage Services</h1>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Services List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Placeholder for services management (Add/Edit/Delete services).</p>
          {/* Future: Table or list of services will go here */}
        </CardContent>
      </Card>
    </div>
  );
}

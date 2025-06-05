
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminInquiriesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Manage Inquiries</h1>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Inquiries List</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Placeholder for inquiries/leads management.</p>
          {/* Future: Table or list of inquiries will go here */}
        </CardContent>
      </Card>
    </div>
  );
}

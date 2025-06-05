
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Admin Settings</h1>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Placeholder for general admin settings (Company Info, SEO, etc.).</p>
          {/* Future: Settings form fields will go here */}
        </CardContent>
      </Card>
    </div>
  );
}

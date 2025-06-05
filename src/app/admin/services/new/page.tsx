
import { AddServiceForm } from "@/components/forms/AddServiceForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AddNewServicePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/services">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Services</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-primary">Add New Service</h1>
      </div>
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
          <CardDescription>Fill in the form below to add a new service to your website.</CardDescription>
        </CardHeader>
        <CardContent>
          <AddServiceForm />
        </CardContent>
      </Card>
    </div>
  );
}

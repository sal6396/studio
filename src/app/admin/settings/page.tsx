
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AdminSettingsForm } from "@/components/forms/AdminSettingsForm";
import { Building, SearchCode } from "lucide-react"; // Changed SearchCog to SearchCode

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-primary">Admin Settings</h1>
      
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Building className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Company Information</CardTitle>
          </div>
          <CardDescription>Manage basic information about your company. In a full application, these could update public-facing details or be used for internal records.</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminSettingsForm section="companyInfo" />
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <SearchCode className="h-6 w-6 text-primary" /> {/* Changed SearchCog to SearchCode */}
            <CardTitle className="text-2xl">Basic SEO Settings</CardTitle>
          </div>
          <CardDescription>Set default SEO metadata for your site. These can often be overridden by page-specific settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminSettingsForm section="seoDefaults" />
        </CardContent>
      </Card>

      {/* Placeholder for other settings sections */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Appearance Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Placeholder for theme and appearance settings (e.g., color schemes, logo upload).</p>
        </CardContent>
      </Card>
       <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Integration Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Placeholder for third-party integrations (e.g., Analytics, Email Marketing).</p>
        </CardContent>
      </Card>
    </div>
  );
}


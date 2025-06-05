
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AdminSettingsForm } from "@/components/forms/AdminSettingsForm";
import { Building, SearchCode, Palette, Settings2 as IntegrationIcon } from "lucide-react"; // Renamed Settings2
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
            <SearchCode className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Basic SEO Settings</CardTitle>
          </div>
          <CardDescription>Set default SEO metadata for your site. These can often be overridden by page-specific settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminSettingsForm section="seoDefaults" />
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Palette className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Appearance Settings</CardTitle>
          </div>
           <CardDescription>Manage the visual aspects of your site.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="logoUpload">Logo Upload</Label>
            <Input id="logoUpload" type="file" disabled />
            <p className="text-sm text-muted-foreground">Upload your company logo (e.g., PNG, SVG). Feature coming soon.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="themeColor">Primary Theme Color</Label>
            <Input id="themeColor" type="text" placeholder="#3066BE" disabled />
            <p className="text-sm text-muted-foreground">Enter a HEX code for the primary theme color. Feature coming soon.</p>
          </div>
        </CardContent>
      </Card>
       <Card className="shadow-md">
        <CardHeader>
           <div className="flex items-center gap-3">
            <IntegrationIcon className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Integration Settings</CardTitle>
          </div>
          <CardDescription>Configure third-party service integrations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="gaId">Google Analytics ID</Label>
            <Input id="gaId" type="text" placeholder="UA-XXXXXXXXX-X" disabled />
            <p className="text-sm text-muted-foreground">Enter your Google Analytics Tracking ID. Feature coming soon.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mailchimpApiKey">Mailchimp API Key</Label>
            <Input id="mailchimpApiKey" type="text" placeholder="your_api_key-usXX" disabled />
            <p className="text-sm text-muted-foreground">Enter your Mailchimp API Key for newsletter integration. Feature coming soon.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


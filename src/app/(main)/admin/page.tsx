import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { COMPANY_NAME } from '@/lib/constants';
import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: `Admin Dashboard | ${COMPANY_NAME}`,
  description: `Manage content and settings for ${COMPANY_NAME}.`,
};

export default function AdminDashboardPage() {
  return (
    <div className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto shadow-xl">
          <CardHeader>
            <div className="flex items-center mb-4">
              <ShieldCheck className="h-10 w-10 text-primary mr-3" />
              <CardTitle className="text-3xl md:text-4xl text-primary">Admin Dashboard</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-4">
              Welcome to the Admin Dashboard. This area is designated for managing your website's content, users, and settings.
            </p>
            <p className="text-muted-foreground">
              Currently, this is a placeholder page. Future development will include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground my-4 space-y-1">
              <li>Blog Post Management (Create, Edit, Delete)</li>
              <li>User Management</li>
              <li>Site Settings Configuration</li>
              <li>Analytics Overview</li>
            </ul>
            <p className="text-muted-foreground">
              Building out these features will require backend integration, database setup, and authentication mechanisms.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

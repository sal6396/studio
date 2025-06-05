
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { COMPANY_NAME } from '@/lib/constants';
import type { Metadata } from 'next';
import { ShieldCheck, MessageSquareText, FolderKanban, Newspaper, FileText, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: `Admin Dashboard | ${COMPANY_NAME}`,
  description: `Manage content and settings for ${COMPANY_NAME}.`,
};

const summaryCardsData = [
  { title: "Total Inquiries", value: "125", icon: MessageSquareText, change: "+12% this month" },
  { title: "Projects Completed", value: "42", icon: FolderKanban, change: "+3 this quarter" },
  { title: "Blog Posts", value: "78", icon: Newspaper, change: "+5 new drafts" },
  { title: "Job Applications", value: "36", icon: FileText, change: "3 under review" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-primary flex items-center">
          <ShieldCheck className="h-10 w-10 mr-3" />
          Admin Dashboard
        </h1>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {summaryCardsData.map((card) => (
            <Card key={card.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <card.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground pt-1">
                  {card.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
         <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Welcome, Admin!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This is your central hub for managing the website. Use the sidebar to navigate through different management sections.
            </p>
            <p className="text-muted-foreground">
              Future development will populate sections like:
            </p>
            <ul className="list-disc list-inside text-muted-foreground my-4 space-y-1">
              <li>Team Member Management</li>
              <li>Service Offerings</li>
              <li>Portfolio Projects</li>
              <li>Blog Content and SEO</li>
              <li>User Inquiries and Leads</li>
              <li>Job Postings and Applications</li>
              <li>Site-wide Settings</li>
            </ul>
             <p className="text-sm text-muted-foreground">
              Note: The navigation links in the sidebar are placeholders. Clicking them will lead to 404 pages until those pages are created.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

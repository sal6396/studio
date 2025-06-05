
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, Newspaper, Users, Mail } from "lucide-react";

export default function AdminDashboardPage() {
  const summaryCards = [
    { title: "Total Leads/Messages", value: "125", icon: Mail, description: "New inquiries this month" },
    { title: "Projects Completed", value: "42", icon: Briefcase, description: "Successfully delivered projects" },
    { title: "Blog Posts", value: "18", icon: Newspaper, description: "Published articles" },
    { title: "Job Applications", value: "3", icon: Users, description: "New candidates to review" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.title} className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Placeholder for recent admin actions or notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Activity log will appear here...</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Placeholder for frequently accessed admin sections.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-primary">
              <li><a href="/admin/blog" className="hover:underline">Manage Blog Posts</a></li>
              <li><a href="/admin/services" className="hover:underline">Update Services</a></li>
              <li><a href="/admin/settings" className="hover:underline">General Settings</a></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

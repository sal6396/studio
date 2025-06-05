
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, Newspaper, Users, Mail, BarChart3, Activity, Link as LinkIcon, Award, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS_DATA, PORTFOLIO_DATA, JOB_LISTINGS_DATA } from "@/lib/constants";

export default function AdminDashboardPage() {
  const publishedProjectsCount = PORTFOLIO_DATA.filter(p => p.isPublished !== false).length;
  const blogPostsCount = BLOG_POSTS_DATA.length;
  const jobListingsCount = JOB_LISTINGS_DATA.length;

  const summaryCards = [
    { title: "Total Leads/Messages", value: "0", icon: Mail, description: "New inquiries this month", href: "/admin/inquiries" },
    { title: "Published Projects", value: publishedProjectsCount.toString(), icon: Briefcase, description: "Published portfolio items", href: "/admin/portfolio" },
    { title: "Blog Posts", value: blogPostsCount.toString(), icon: Newspaper, description: "Published articles", href: "/admin/blog" },
    { title: "Open Job Listings", value: jobListingsCount.toString(), icon: Award, description: "Current job openings", href: "/admin/jobs" },
  ];

  const quickLinks = [
    { label: "Manage Services", href: "/admin/services", icon: Briefcase },
    { label: "Manage Portfolio", href: "/admin/portfolio", icon: LayoutGrid }, // Changed icon to LayoutGrid to match nav
    { label: "Manage Blog Posts", href: "/admin/blog", icon: Newspaper },
    { label: "View Inquiries", href: "/admin/inquiries", icon: Mail },
    { label: "Manage Job Listings", href: "/admin/jobs", icon: Award }, // Label changed for consistency
    { label: "Team Management", href: "/admin/team", icon: Users },
    { label: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-primary">Admin Dashboard</h1>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-foreground/80">Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <Card key={card.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                <card.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{card.value}</div>
                <p className="text-xs text-muted-foreground pt-1">{card.description}</p>
                <Button variant="link" asChild className="px-0 pt-2 text-sm text-primary">
                  <Link href={card.href}>View Details &rarr;</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              Analytics Placeholder
            </CardTitle>
            <CardDescription>Monthly traffic, inquiry trends, project status (charts will go here).</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-md">
            <p className="text-muted-foreground">Chart Data Will Be Displayed Here</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              Recent Activity / Notifications
            </CardTitle>
            <CardDescription>Latest submissions and system events.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["New contact form submitted.", "Project 'Alpha' marked as complete.", "User 'editor_jane' logged in."].map((activity, index) => (
              <div key={index} className="text-sm p-2 bg-secondary/50 rounded-md">
                <p className="text-foreground/90">{activity}</p>
                <p className="text-xs text-muted-foreground">{(index + 1) * 5} minutes ago</p>
              </div>
            ))}
             <Button variant="outline" className="w-full mt-2">View All Activity</Button>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-foreground/80">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {quickLinks.map(link => {
            const Icon = link.icon || LinkIcon; // Default to LinkIcon if specific one is not provided
            return (
            <Button variant="outline" asChild key={link.href} className="justify-start text-base py-6 h-auto hover:bg-primary/5 hover:border-primary">
              <Link href={link.href} className="flex flex-col items-center justify-center text-center p-2 sm:flex-row sm:justify-start sm:text-left sm:p-4">
                <Icon className="h-6 w-6 mb-2 sm:mb-0 sm:mr-3 text-primary" />
                <span className="text-sm font-medium text-foreground">{link.label}</span>
              </Link>
            </Button>
          );
        })}
        </div>
      </section>
    </div>
  );
}

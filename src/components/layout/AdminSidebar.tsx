
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { APP_NAME, Icons } from "@/lib/constants"; // Assuming Icons.home or similar exists
import { LayoutDashboard, Users, Briefcase, FolderKanban, Newspaper, MessageSquareText, UserCheck, Settings, ShieldCheck } from "lucide-react";

const adminNavLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/team", label: "Team Management", icon: Users },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquareText },
  { href: "/admin/careers", label: "Careers", icon: UserCheck },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card text-card-foreground border-r border-border flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2 text-xl font-bold text-primary">
          <ShieldCheck className="h-7 w-7" />
          <span>{APP_NAME} Admin</span>
        </Link>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {adminNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted hover:text-foreground"
            )}
          >
            <link.icon className="h-5 w-5" />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-border mt-auto">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {APP_NAME}</p>
      </div>
    </aside>
  );
}


"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ADMIN_NAV_LINKS, APP_NAME, Icons } from "@/lib/constants";
import { LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/admin/ThemeToggle";


export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    router.push('/admin/login');
  };

  return (
    <SidebarProvider defaultOpen>
      <Sidebar className="border-r">
        <SidebarHeader className="p-4">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2 text-xl font-bold text-primary">
              <Icons.dashboard className="h-7 w-7" />
              <span>{APP_NAME}</span>
            </Link>
            <SidebarTrigger className="md:hidden" />
          </div>
        </SidebarHeader>
        <ScrollArea className="flex-1">
          <SidebarContent>
            <SidebarMenu className="p-4 space-y-2">
              {ADMIN_NAV_LINKS.map((link) => {
                const Icon = link.icon || Icons.generic;
                const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={cn(
                        "w-full justify-start text-base h-12",
                        isActive && "bg-primary/10 text-primary font-semibold"
                      )}
                    >
                      <Link href={link.href} className="flex items-center">
                        <Icon className="mr-3 h-5 w-5" />
                        {link.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>
        </ScrollArea>
        <SidebarFooter className="p-4 border-t">
          <div className="flex items-center justify-between w-full">
            <Button variant="outline" className="flex-grow justify-start text-base h-12 mr-2" onClick={handleLogout}>
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
            <ThemeToggle />
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}

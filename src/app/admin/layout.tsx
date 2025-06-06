
"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import { AdminThemeProvider } from "@/context/AdminThemeContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); 

  useEffect(() => {
    setIsClient(true);
  }, []);

  const publicAdminPages = ["/admin/login", "/admin/forgot-password"];

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

    if (!publicAdminPages.includes(pathname) && !isAdminLoggedIn) {
      router.replace("/admin/login");
    } else {
      setIsLoading(false);
    }
  }, [isClient, pathname, router]);


  if (isLoading && isClient && !publicAdminPages.includes(pathname)) {
    return (
      <AdminThemeProvider> 
        <div className="flex min-h-screen items-center justify-center bg-muted/40">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </AdminThemeProvider>
    );
  }
  
  if (publicAdminPages.includes(pathname)) {
    return (
      <AdminThemeProvider>
        {children}
      </AdminThemeProvider>
    );
  }

  return (
    <AdminThemeProvider>
      <div className="flex min-h-screen bg-muted/40">
        <AdminSidebar />
        <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </AdminThemeProvider>
  );
}

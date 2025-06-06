
"use client";

import AdminSidebar from "@/components/layout/AdminSidebar";
import { AdminThemeProvider } from "@/context/AdminThemeContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
// Metadata is typically handled differently in "use client" components.
// It might be set in a parent server component layout or dynamically via document.title.
// For simplicity, we'll rely on RootLayout's metadata for now.
// import { COMPANY_NAME } from "@/lib/constants";
// import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: `Admin Dashboard | ${COMPANY_NAME}`,
//   description: `Admin dashboard for ${COMPANY_NAME}.`,
// };

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // Ensure localStorage is accessed only client-side

  useEffect(() => {
    // This effect runs once on mount to confirm we are on the client-side
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) {
      // If not yet on client, don't do anything (localStorage not available)
      return;
    }

    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

    if (pathname !== "/admin/login" && !isAdminLoggedIn) {
      // If trying to access a protected admin page and not logged in, redirect to login
      router.replace("/admin/login");
    } else {
      // If on login page, or logged in, or redirection handled, stop loading
      setIsLoading(false);
    }
    // setIsLoading(false) will be called eventually after check or redirect
  }, [isClient, pathname, router]);


  if (isLoading && isClient && pathname !== "/admin/login") {
    // Show loader for protected admin pages while auth status is being checked
    return (
      <AdminThemeProvider> {/* ThemeProvider needed for themed loader bg */}
        <div className="flex min-h-screen items-center justify-center bg-muted/40">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </AdminThemeProvider>
    );
  }
  
  // If on the login page, render children directly without the admin sidebar structure
  if (pathname === "/admin/login") {
    return (
      <AdminThemeProvider>
        {/* The login page children will be rendered here */}
        {children}
      </AdminThemeProvider>
    );
  }

  // For authenticated admin pages (or if isLoading became false for other reasons while on a non-login page)
  // We still rely on the useEffect to redirect if not authenticated after loading.
  // So, if we reach here and are not on /admin/login, it implies authentication (or redirection is happening).
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


import AdminSidebar from "@/components/layout/AdminSidebar";
import { AdminThemeProvider } from "@/context/AdminThemeContext";
import { COMPANY_NAME } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Admin Dashboard | ${COMPANY_NAME}`,
  description: `Admin dashboard for ${COMPANY_NAME}.`,
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminThemeProvider>
      {/* The .dark class will be applied to <html> by AdminThemeProvider */}
      {/* Tailwind's dark: variant will work on any element within this provider context */}
      <div className="flex min-h-screen bg-muted/40"> 
        <AdminSidebar />
        <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </AdminThemeProvider>
  );
}


import AdminSidebar from "@/components/layout/AdminSidebar";
import type { Metadata } from "next";
import { COMPANY_NAME } from "@/lib/constants";

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
    <div className="flex min-h-screen bg-muted/40">
      <AdminSidebar />
      <main className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}

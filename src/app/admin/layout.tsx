
import AdminSidebar from "@/components/layout/AdminSidebar";
import type { ReactNode } from 'react';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}

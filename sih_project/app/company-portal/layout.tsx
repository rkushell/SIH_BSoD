// app/company-portal/layout.tsx
import React from "react";
// Import the Client Component that handles the interactive header
import PortalHeader from "@/components/company-portal/portal-header"; 

export const metadata = {
  title: "Company Portal - PM Internship Scheme",
};

export default function CompanyPortalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen">
      {/* All interactive logic (onClick, usePathname, ThemeToggle) is now inside PortalHeader */}
      <PortalHeader />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Company Portal</h1>
          <p className="text-muted-foreground mt-1">
            Manage your internship programs and candidates
          </p>
        </div>

        {/* Page content */}
        <div>{children}</div>
      </main>
    </div>
  );
}
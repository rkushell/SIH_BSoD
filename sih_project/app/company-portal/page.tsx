// app/company-portal/page.tsx
"use client";
import React from "react";
import RoleList from "@/components/company-portal/row-list";
import PendingApplications from "@/components/company-portal/pending-applications";
import StatsRow from "@/components/company-portal/stats-row";


export default function CompanyPortalDashboardPage() {
  return (
    <div className="w-full">
      <StatsRow />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Active Roles</h2>
              <button
                className="px-3 py-2 rounded-md bg-primary/10 text-primary"
                onClick={() => {
                  /* open add role dialog later */
                }}
              >
                + Add Role
              </button>
            </div>

            <RoleList />
          </div>
        </div>

        <div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Pending Applications</h2>
              <button className="text-sm text-muted-foreground">View All →</button>
            </div>

            <PendingApplications />
          </div>
        </div>
      </div>
    </div>
  );
}

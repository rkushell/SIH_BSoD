// components/company-portal/stats-row.tsx
"use client";
import React from "react";

function StatCard({ title, value, children }: { title: string; value: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg bg-muted-foreground/5 flex items-center justify-center text-xl">
        {children ?? "◻"}
      </div>
      <div>
        <div className="text-2xl font-semibold">{value}</div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </div>
    </div>
  );
}

export default function StatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Active Roles" value="—">
        <span>🧩</span>
      </StatCard>

      <StatCard title="Total Applications" value="—">
        <span>👥</span>
      </StatCard>

      <StatCard title="Pending Review" value="—">
        <span>⏳</span>
      </StatCard>

      <StatCard title="Positions Filled" value="—">
        <span>✔️</span>
      </StatCard>
    </div>
  );
}

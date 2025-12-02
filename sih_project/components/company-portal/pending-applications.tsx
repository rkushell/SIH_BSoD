// components/company-portal/role-list.tsx
"use client";
import React from "react";

function ProgressBar({ percent = 0 }: { percent?: number }) {
  return (
    <div className="w-full bg-muted/10 h-2 rounded-full overflow-hidden">
      <div
        className="h-2 rounded-full"
        style={{
          width: `${percent}%`,
          background: "linear-gradient(90deg,var(--color-primary),var(--color-secondary))",
        }}
      />
    </div>
  );
}

export default function PendingApplications() {
  const placeholderApps = Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    role: "Role title placeholder",
    applicant: "Student name",
    status: "Pending",
  }));

  return (
    <div className="space-y-4">
      {placeholderApps.map((a) => (
        <div
          key={a.id}
          className="p-4 rounded-md border border-border bg-card-foreground/0"
        >
          <div className="font-medium">{a.role}</div>
          <div className="text-sm text-muted-foreground">{a.applicant}</div>
          <div className="mt-2 text-xs text-muted-foreground">{a.status}</div>
        </div>
      ))}
    </div>
  );
}

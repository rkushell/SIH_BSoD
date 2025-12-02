// components/company-portal/role-list.tsx
"use client";
import React from "react";

function ProgressBar({ percent = 0 }: { percent?: number }) {
  return (
    <div className="w-full bg-muted/10 h-2 rounded-full overflow-hidden">
      <div className="h-2 rounded-full" style={{ width: `${percent}%`, background: "linear-gradient(90deg,var(--color-primary),var(--color-secondary))" }} />
    </div>
  );
}

export default function RoleList() {
  // placeholder: render empty boxes with placeholders
  const placeholderRoles = Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    title: "Role title placeholder",
    subtitle: "Department",
    filled: "0 / 0",
    percent: 0,
    apps: 0,
  }));

  return (
    <div className="space-y-4">
      {placeholderRoles.map((r) => (
        <div key={r.id} className="p-4 rounded-md border border-border bg-card-foreground/0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-medium">{r.title}</div>
              <div className="text-sm text-muted-foreground">{r.subtitle}</div>
            </div>
            <div className="text-sm text-muted-foreground">{r.apps} apps</div>
          </div>

          <div className="mb-2 text-sm text-muted-foreground">{r.filled}</div>
          <ProgressBar percent={r.percent} />
        </div>
      ))}
    </div>
  );
}

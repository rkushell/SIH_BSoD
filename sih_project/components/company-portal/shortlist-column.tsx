// components/company-portal/shortlist-column.tsx
"use client";
import React from "react";

interface ShortlistColumnProps {
  title: string;
  badgeCount: number;
  children?: React.ReactNode;
}

export default function ShortlistColumn({ title, badgeCount, children }: ShortlistColumnProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        <span className="px-2 py-1 text-xs rounded-md bg-muted">
          {badgeCount}
        </span>
      </div>

      <div className="space-y-3">
        {children ? (
          children
        ) : (
          <div className="text-muted-foreground text-sm">
            No candidates yet
          </div>
        )}
      </div>
    </div>
  );
}

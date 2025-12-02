// app/company-portal/shortlist/page.tsx
"use client";
import React from "react";
import ShortlistColumn from "@/components/company-portal/shortlist-column";

export default function CompanyPortalShortlistPage() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-2">Candidate Shortlisting</h2>
      <p className="text-muted-foreground mb-6">Drag and drop to reorder candidates</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ShortlistColumn title="AI Shortlist" badgeCount={0}>
          {/* Placeholders: clone the card component or keep empty */}
        </ShortlistColumn>

        <ShortlistColumn title="Human Review" badgeCount={0}>
          {/* placeholder */}
        </ShortlistColumn>

        <ShortlistColumn title="Selected" badgeCount={0}>
          <div className="text-muted-foreground p-6 rounded-md border border-border">
            Selected candidates appear here
          </div>
        </ShortlistColumn>
      </div>
    </div>
  );
}

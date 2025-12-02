// app/company-portal/onboarding/page.tsx
"use client";
import React from "react";
// Corrected import path
import LetterTemplateCard from "@/components/company-portal/letter-template-card"; 

export default function CompanyPortalOnboardingPage() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-2">Onboarding</h2>
      <p className="text-muted-foreground mb-6">Send offer letters or rejection notices to candidates</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Selected Candidates</h3>

          <div className="space-y-4">
            {/* placeholder candidate rows */}
            <div className="flex items-center justify-between p-4 rounded-md border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted-foreground/10 flex items-center justify-center text-muted-foreground">
                  AS
                </div>
                <div>
                  <div className="font-medium">Aarav Sharma</div>
                  <div className="text-sm text-muted-foreground">Software Developer Intern</div>
                </div>
              </div>
              <button className="px-3 py-2 rounded-md border border-border">Send Letter</button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-md border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted-foreground/10 flex items-center justify-center text-muted-foreground">
                  PP
                </div>
                <div>
                  <div className="font-medium">Priya Patel</div>
                  <div className="text-sm text-muted-foreground">Data Analyst Intern</div>
                </div>
              </div>
              <button className="px-3 py-2 rounded-md border border-border">Send Letter</button>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-4">Letter Templates</h3>

          <div className="space-y-4">
            <LetterTemplateCard title="Offer Letter Template" description="Standard internship offer letter" />
            <LetterTemplateCard title="Rejection Letter Template" description="Professional rejection notice" />
            <LetterTemplateCard title="Welcome Kit" description="Onboarding documents package" />
            <button className="w-full mt-3 px-4 py-2 rounded-md border border-border">Create Custom Template</button>
          </div>
        </div>
      </div>
    </div>
  );
}
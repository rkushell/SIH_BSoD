"use client";
import React from "react";
// Import the component from the new file
import BenefitChart from "@/components/company-portal/benefit-chart"; 
import { Separator } from "@/components/ui/seperator";
import { Card, CardTitle } from "@/components/ui/card"; // Keep other necessary imports

// Main page component
export default function CompanyPortalInformationPage() {
  return (
    <div className="w-full">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
            <h1 className="text-4xl font-bold mb-2">Company Information & Benefits</h1>
            <p className="text-muted-foreground mb-10">
                Understand the strategic value of participating in the Prime Minister Internship Scheme.
            </p>

            {/* Key Data Points Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <Card className="p-5 bg-card/50">
                    <CardTitle className="text-4xl font-extrabold text-primary">3,500+</CardTitle>
                    <p className="text-sm text-muted-foreground">Internships Offered</p>
                </Card>
                <Card className="p-5 bg-card/50">
                    <CardTitle className="text-4xl font-extrabold text-primary">85%</CardTitle>
                    <p className="text-sm text-muted-foreground">High-Value Retention Rate</p>
                </Card>
                <Card className="p-5 bg-card/50">
                    <CardTitle className="text-4xl font-extrabold text-primary">2.5X</CardTitle>
                    <p className="text-sm text-muted-foreground">Recruitment Cost Savings</p>
                </Card>
                <Card className="p-5 bg-card/50">
                    <CardTitle className="text-4xl font-extrabold text-primary">150+</CardTitle>
                    <p className="text-sm text-muted-foreground">Participating Universities</p>
                </Card>
            </div>


            <Separator className="my-12" />

            {/* Interactive Data Section */}
            <h2 className="text-3xl font-bold mb-6">Interactive Benefits Data</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <BenefitChart 
                    title="Intern-to-Hire Conversion (Last 12 Months)" 
                    data="Area Chart (High Retention)"
                    className="lg:col-span-2"
                />
                
                <BenefitChart 
                    title="Cost Savings: Intern vs. Traditional Hire" 
                    data="Bar Chart (2.5X Savings)"
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <BenefitChart 
                    title="Innovation Index Scores by Intern Project" 
                    data="Radar Chart"
                />
                <BenefitChart 
                    title="Student Engagement by Region" 
                    data="Pie Chart"
                />
                <BenefitChart 
                    title="Skill Gap Reduction via Intern Training" 
                    data="Line Chart"
                />
            </div>
        </div>
    </div>
  );
}
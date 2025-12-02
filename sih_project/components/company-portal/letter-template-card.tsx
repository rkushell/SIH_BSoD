"use client";
import React from "react";

export default function LetterTemplateCard({ title, onClick, description }: { title: string; description: string; onClick?: () => void }) {
  return (
    <div className="p-4 rounded-lg border border-border">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>

      <button
        className="mt-3 px-3 py-2 rounded-md border border-border"
        onClick={() => console.log("clicked template:", title)}
      >
        Use Template
      </button>
    </div>
  );
}


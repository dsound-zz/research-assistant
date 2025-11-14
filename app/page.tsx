"use client";

import { useState } from "react";
import ResearchForm from "@/components/ResearchForm";
import Summary from "@/components/Summary";
import DataTable from "@/components/DataTable";
import Citations from "@/components/Citations";
import type { ResearchResult } from "@/lib/types";

export default function Home() {
  const [result, setResult] = useState<ResearchResult | null>(null);

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
        <header className="space-y-3 border-b border-slate-300 pb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
            Materials intelligence
          </p>
          <h1 className="font-serif text-4xl text-slate-900">
            Scientific Research Assistant
          </h1>
          <p className="max-w-3xl text-base text-slate-600">
            Enter a technical question to obtain a structured summary, normalized
            data points, and expandable citations. The interface is intentionally
            terse to emphasize data quality.
          </p>
        </header>

        <ResearchForm onResult={setResult} />

        {result ? (
          <div className="space-y-6">
            <Summary items={result.summary} />
            <DataTable rows={result.data_points} />
            <Citations items={result.citations} />
          </div>
        ) : (
          <section className="rounded-lg border border-dashed border-slate-300 bg-white/60 p-8 text-sm text-slate-600">
            Provide a specific research question - such as target materials,
            measurement conditions, or performance thresholds - to receive an
            analysis that prioritizes quantitative evidence.
          </section>
        )}
      </div>
    </main>
  );
}

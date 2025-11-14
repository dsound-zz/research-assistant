'use client';

import type { ResearchResult } from "@/lib/types";

type SummaryProps = {
  items: ResearchResult["summary"];
};

export default function Summary({ items }: SummaryProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6">
      <header className="mb-4">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
          Overview
        </p>
        <h2 className="font-serif text-[21px] text-slate-900">Structured summary</h2>
      </header>
      <ul className="list-disc space-y-2 pl-5 text-slate-800">
        {items.map((point, index) => (
          <li key={`${point}-${index}`} className="leading-relaxed">
            {point}
          </li>
        ))}
      </ul>
    </section>
  );
}

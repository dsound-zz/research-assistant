'use client';

import type { ResearchResult } from "@/lib/types";

type CitationsProps = {
  items: ResearchResult["citations"];
};

export default function Citations({ items }: CitationsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6">
      <header className="mb-4">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
          References
        </p>
        <h2 className="font-serif text-2xl text-slate-900">Citations</h2>
      </header>
      <div className="space-y-3">
        {items.map((citation, index) => (
          <details
            key={`${citation.title}-${index}`}
            className="border border-slate-200 bg-slate-50/60 p-4 open:bg-white"
          >
            <summary className="cursor-pointer list-none text-sm font-semibold text-slate-800">
              {citation.title}
            </summary>
            <p className="mt-2 text-sm text-slate-600">{citation.excerpt}</p>
            {citation.link && (
              <a
                href={citation.link}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex text-xs uppercase tracking-[0.2em] text-slate-500 underline"
              >
                View source
              </a>
            )}
          </details>
        ))}
      </div>
    </section>
  );
}

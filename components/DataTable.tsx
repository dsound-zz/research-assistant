'use client';

import type { ResearchResult } from "@/lib/types";

type DataTableProps = {
  rows: ResearchResult["data_points"];
};

export default function DataTable({ rows }: DataTableProps) {
  if (!rows || rows.length === 0) {
    return null;
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6">
      <header className="mb-4 flex flex-col gap-1">
        <p className="text-[9px] uppercase tracking-[0.25em] text-slate-500">
          Extracted data
        </p>
        <h2 className="font-serif text-[21px] text-slate-900">Data points</h2>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse text-[11px]">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-600">
              <th className="py-2 pr-4 font-semibold uppercase tracking-[0.2em]">
                Material
              </th>
              <th className="py-2 pr-4 font-semibold uppercase tracking-[0.2em]">
                Value
              </th>
              <th className="py-2 font-semibold uppercase tracking-[0.2em]">
                Source
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={`${row.material}-${row.source}-${index}`}
                className="border-b border-slate-100 text-slate-800 last:border-b-0"
              >
                <td className="py-3 pr-4 align-top">{row.material}</td>
                <td className="py-3 pr-4 align-top">{row.value}</td>
                <td className="py-3 align-top text-slate-600">{row.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

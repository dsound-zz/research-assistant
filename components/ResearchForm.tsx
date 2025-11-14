"use client";

import { useState, FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import type { ResearchResult } from "@/lib/types";

type ResearchFormProps = {
  onResult: (result: ResearchResult) => void;
};

export default function ResearchForm({ onResult }: ResearchFormProps) {
  const [question, setQuestion] = useState("");

  const mutation = useMutation<ResearchResult, Error, string>({
    mutationFn: async (prompt: string) => {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: prompt }),
      });

      if (!response.ok) {
        const message =
          (await response.json().catch(() => undefined))?.error ??
          "Unable to process the query.";
        throw new Error(message);
      }

      return (await response.json()) as ResearchResult;
    },
    onSuccess: (data) => {
      onResult(data);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed || mutation.isPending) {
      return;
    }
    mutation.mutate(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-6"
    >
      <label
        htmlFor="research-question"
        className="block text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500"
      >
        Enter a research question...
      </label>
      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <input
          id="research-question"
          name="research-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="e.g., What are the latest carrier mobility measurements for doped graphene?"
          className="flex-1 rounded border border-slate-300 bg-slate-50 px-4 py-3 text-[13px] text-slate-900 placeholder:text-slate-500 focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
          aria-label="Research question"
        />
        <button
          type="submit"
          className="w-full rounded border border-slate-900 bg-slate-900 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition-colors disabled:cursor-not-allowed disabled:border-slate-400 disabled:bg-slate-400 md:w-auto"
          disabled={question.trim().length === 0 || mutation.isPending}
        >
          Process
        </button>
      </div>
      {mutation.isPending && (
        <div className="mt-5 space-y-2">
          <p className="text-[11px] text-slate-600">Processing query...</p>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/3 bg-slate-600 progress-bar" />
          </div>
        </div>
      )}
      {mutation.error && (
        <p className="mt-4 text-[11px] text-red-700">{mutation.error.message}</p>
      )}
    </form>
  );
}

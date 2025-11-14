import { NextResponse } from "next/server";
import type { QueryPayload, ResearchResult } from "@/lib/types";

const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<QueryPayload>;
    const query = body?.query?.trim();

    if (!query) {
      return NextResponse.json(
        { error: "Please provide a research question." },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured on the server." },
        { status: 500 },
      );
    }

    const completion = await fetch(OPENAI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are a neutral materials science research assistant. Return only valid JSON for the keys summary, data_points, and citations. Provide succinct bullet points, a compact table of quantitative data, and concise citations with excerpts.",
          },
          {
            role: "user",
            content: `Research question: ${query}`,
          },
        ],
        max_tokens: 900,
      }),
    });

    if (!completion.ok) {
      const errorText = await completion.text();
      return NextResponse.json(
        { error: "OpenAI request failed.", detail: errorText },
        { status: completion.status },
      );
    }

    const payload = await completion.json();
    const content: string | undefined =
      payload?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "Invalid response structure from OpenAI." },
        { status: 502 },
      );
    }

    let result: ResearchResult;
    try {
      result = JSON.parse(content) as ResearchResult;
    } catch (parseError) {
      return NextResponse.json(
        { error: "Unable to parse research response." },
        { status: 502 },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Query handler failed:", error);
    return NextResponse.json(
      { error: "Unexpected error while processing the query." },
      { status: 500 },
    );
  }
}

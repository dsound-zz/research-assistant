export interface ResearchResult {
  summary: string[];
  data_points: {
    material: string;
    value: string;
    source: string;
  }[];
  citations: {
    title: string;
    link?: string;
    excerpt: string;
  }[];
}

export interface QueryPayload {
  query: string;
}

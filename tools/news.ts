import type Anthropic from "@anthropic-ai/sdk";

export const newsTool: Anthropic.Tool = {
  name: "get_top_headlines",
  description:
    "Get today's top news headlines, optionally filtered by country and category",
  input_schema: {
    type: "object",
    properties: {
      country: {
        type: "string",
        description: "2-letter country code, e.g. 'us'",
      },
      category: {
        type: "string",
        enum: [
          "business",
          "entertainment",
          "general",
          "health",
          "science",
          "sports",
          "technology",
        ],
        description: "News category to filter by",
      },
    },
  },
};

export async function getTopHeadlines(input: {
  country?: string;
  category?: string;
}): Promise<string> {
  const url = new URL("https://newsapi.org/v2/top-headlines");
  url.searchParams.set("country", input.country ?? "us");

  if (input.category) url.searchParams.set("category", input.category);
  const res = await fetch(url, {
    headers: { "X-Api-Key": process.env.NEWS_API_KEY ?? "" },
  });

  const data = await res.json();

  if (data.status !== "ok")
    return `Failed to fetch headlines: ${data.message ?? "unknown error"}`;

  if (data.articles.length === 0) return "No headlines found.";

  return data.articles
    .slice(0, 5)
    .map((a: any, i: number) => `${i + 1}. ${a.title} (${a.source.name})`)
    .join("\n");
}

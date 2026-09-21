import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getWeather } from "./tools/weather.ts";
import { getTopHeadlines } from "./tools/news.ts";

const server = new McpServer({
  name: "agentic-loop-example",
  version: "1.0.0",
});

server.registerTool(
  "get_weather",
  {
    title: "Get Weather",
    description: "Get current weather for a city",
    inputSchema: { city: z.string() },
  },
  async ({ city }) => ({
    content: [{ type: "text", text: await getWeather(city) }],
  })
);

server.registerTool(
  "get_top_headlines",
  {
    title: "Get Top Headlines",
    description:
      "Get today's top news headlines, optionally filtered by country and category",
    inputSchema: {
      country: z
        .string()
        .describe("2-letter country code, e.g. 'us'")
        .optional(),
      category: z
        .enum([
          "business",
          "entertainment",
          "general",
          "health",
          "science",
          "sports",
          "technology",
        ])
        .optional(),
    },
  },
  async (input) => ({
    content: [{ type: "text", text: await getTopHeadlines(input) }],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);

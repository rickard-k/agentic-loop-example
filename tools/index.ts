import type Anthropic from "@anthropic-ai/sdk";
import { weatherTool, getWeather } from "./weather.ts";
import { newsTool, getTopHeadlines } from "./news.ts";

export const tools: Anthropic.Tool[] = [weatherTool, newsTool];

export async function runTool(name: string, input: any): Promise<string> {
  if (name === "get_weather") return getWeather(input.city);
  if (name === "get_top_headlines") return getTopHeadlines(input);
  return "unknown tool";
}

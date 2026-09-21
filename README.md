# agentic-loop-example

A minimal example of an agentic tool-use loop with the Anthropic SDK: Claude is given a set of tools, decides when to call them, and the loop keeps feeding results back until it produces a final answer.

## Setup

Install dependencies:

```
npm install
```

Create a `.env` file with:

```
ANTHROPIC_API_KEY=your-anthropic-api-key
NEWS_API_KEY=your-newsapi-org-api-key
```

- `ANTHROPIC_API_KEY` — from [console.anthropic.com](https://console.anthropic.com) (separate from a claude.ai login)
- `NEWS_API_KEY` — from [newsapi.org](https://newsapi.org)

## Run

```
npm start
```

This runs [agent.ts](agent.ts), which sends a sample prompt to Claude and lets it call tools as needed.

## Project structure

- [agent.ts](agent.ts) — the agent loop: sends messages to Claude, executes any requested tool calls, and feeds results back until Claude gives a final answer
- [tools/index.ts](tools/index.ts) — aggregates all tool schemas and dispatches tool calls by name
- [tools/weather.ts](tools/weather.ts) — `get_weather` tool, using Open-Meteo (no API key required)
- [tools/news.ts](tools/news.ts) — `get_top_headlines` tool, using NewsAPI.org

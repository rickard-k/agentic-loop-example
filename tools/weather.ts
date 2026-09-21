import type Anthropic from "@anthropic-ai/sdk";

export const weatherTool: Anthropic.Tool = {
  name: "get_weather",
  description: "Get current weather for a city",
  input_schema: {
    type: "object",
    properties: { city: { type: "string" } },
    required: ["city"],
  },
};

const WEATHER_CODES: Record<number, string> = {
  0: "clear sky",
  1: "mainly clear",
  2: "partly cloudy",
  3: "overcast",
  45: "fog",
  48: "depositing rime fog",
  51: "light drizzle",
  53: "moderate drizzle",
  55: "dense drizzle",
  61: "slight rain",
  63: "moderate rain",
  65: "heavy rain",
  71: "slight snow",
  73: "moderate snow",
  75: "heavy snow",
  80: "slight rain showers",
  81: "moderate rain showers",
  82: "violent rain showers",
  95: "thunderstorm",
};

export async function getWeather(city: string): Promise<string> {
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      city
    )}&count=1`
  );
  const geoData = await geoRes.json();
  const place = geoData.results?.[0];
  if (!place) return `Could not find location: ${city}`;

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code`
  );
  const weatherData = await weatherRes.json();
  const current = weatherData.current;
  const condition =
    WEATHER_CODES[current.weather_code] ?? `code ${current.weather_code}`;

  return `${place.name}: ${current.temperature_2m}°C, ${condition}`;
}

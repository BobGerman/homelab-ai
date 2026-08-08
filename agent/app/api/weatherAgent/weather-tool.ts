import { UIToolInvocation, tool } from 'ai';
import { z } from 'zod';

export const weatherTool = tool({

  description: 'Get the weather in a location',

  inputSchema: z.object({
    city: z.string(),
    // NOTE: Some models send numeric lat/long even if the schema
    // specifies string, so we need to accept both types here
    latitude: z.union([z.string(), z.number()]),
    longitude: z.union([z.string(), z.number()])
  }),

  async *execute({ city, latitude, longitude }: {
    city: string, latitude: string | number, longitude: string | number
  }) {

    yield { state: 'loading' as const };

    const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

    let weather: string;
    let temperatureFarenheit: number;
    let icon: string;
    let temperatureFeelsLike: number;
    let humidity: number;
    let visibilityFeet: number;
    let windSpeedMilesPerHour: number;
    let windDirectionDegrees: number;
    let windGustMilesPerHour: number;
    let timezoneFromUtcSeconds: number;

    if (!OPEN_WEATHER_API_KEY) {

      //#region No API key, use mock data
      await new Promise(resolve => setTimeout(resolve, 2000)); // simulate network delay

      if (latitude === '40.7128') {         // New York
        weather = 'scorching';
        temperatureFarenheit = 95;
        icon = "01d";
      } else if (latitude === '34.0522') {  // Los Angeles
        weather = 'foggy';
        temperatureFarenheit = 65;
        icon = "50d";
      } else if (latitude === '41.8781') {  // Chicago
        weather = 'tsunami';
        temperatureFarenheit = 50;
        icon = "09d";
      } else if (latitude === '37.7749') {  // San Francisco
        weather = 'hurricane';
        temperatureFarenheit = 55;
        icon = "11d";
      } else {
        weather = 'sunny';                  // Default mock weather
        temperatureFarenheit = 75;
        icon = "01d";
      }
      temperatureFeelsLike = temperatureFarenheit - 2;
      humidity = 50;
      visibilityFeet = 10000;
      windSpeedMilesPerHour = 10;
      windDirectionDegrees = 90;
      windGustMilesPerHour = 20;
      timezoneFromUtcSeconds = -18000;

      console.log(`Using mock weather conditions ${weather} for city of ${city} at latitude ${latitude}`);
      //#endregion

    } else {

      //#region Real API call
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.toString()}&lon=${longitude.toString()}&appid=${OPEN_WEATHER_API_KEY}&units=imperial`
      );
      const data = await response.json();
      const weatherArray = data.weather;
      weather = weatherArray && weatherArray.length > 0 ? weatherArray[0].description : 'unknown';
      icon = weatherArray && weatherArray.length > 0 ? weatherArray[0].icon : '01d';
      temperatureFarenheit = data.main ? data.main.temp : 0;
      temperatureFeelsLike = data.main ? data.main.feels_like : 0;
      humidity = data.main ? data.main.humidity : 0;
      visibilityFeet = data.visibility ? data.visibility * 3.28084 : 0; // convert meters to feet
      windSpeedMilesPerHour = data.wind ? data.wind.speed : 0;
      windDirectionDegrees = data.wind ? data.wind.deg : 0;
      windGustMilesPerHour = data.wind && data.wind.gust ? data.wind.gust : 0;
      timezoneFromUtcSeconds = data.timezone ? data.timezone : 0;


      console.log(`Retrieved OpenWeatherMap conditions ${weather} for city of ${city} at latitude ${latitude}`);

      //#endregion

    }

    yield {
      state: 'ready' as const,
      weather,
      icon,
      city,
      temperatureFarenheit,
      temperatureFeelsLike,
      humidity,
      visibilityFeet,
      windSpeedMilesPerHour,
      windDirectionDegrees,
      windGustMilesPerHour,
      timezoneFromUtcSeconds
    };
  },
});

export type WeatherUIToolInvocation = UIToolInvocation<typeof weatherTool>;
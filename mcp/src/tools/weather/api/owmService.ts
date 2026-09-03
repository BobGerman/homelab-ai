import type { OwmResponse } from './owmResponse';

export type weatherConditions = {
    city: string;
    icon: string;
    weather: string;
    temperatureFarenheit: number;
    temperatureFeelsLike: number;
    humidity: number;
    visibilityFeet: number;
    windSpeedMilesPerHour: number;
    windDirectionDegrees: number;
    windGustMilesPerHour: number;
    timezoneFromUtcSeconds: number;
}

export async function getCurrentConditions(
    city: string,
    latitude: number,
    longitude: number
): Promise<weatherConditions> {

    const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

    let result: weatherConditions = {
        city: city,
        icon: "",
        weather: "unknown",
        temperatureFarenheit: 70,
        temperatureFeelsLike: 75,
        humidity: 50,
        visibilityFeet: 10000,
        windSpeedMilesPerHour: 4,
        windDirectionDegrees: 0,
        windGustMilesPerHour: 100,
        timezoneFromUtcSeconds: -18000
    }

    if (!OPEN_WEATHER_API_KEY) {

        //#region No API key, use mock data
        await new Promise(resolve => setTimeout(resolve, 2000)); // simulate network delay

        if (city == "new york") {
            result.weather = 'scorching';
            result.temperatureFarenheit = 95;
            result.icon = "01d";
        } else if (city == "boston") {
            result.weather = 'foggy';
            result.temperatureFarenheit = 65;
            result.icon = "50d";
        } else if (city == "chicago") {
            result.weather = 'tsunami';
            result.temperatureFarenheit = 50;
            result.icon = "09d";
        } else if (city == "miami") {
            result.weather = 'hurricane';
            result.temperatureFarenheit = 55;
            result.icon = "11d";
        } else {
            result.weather = 'sunny';                  // Default mock weather
            result.temperatureFarenheit = 75;
            result.icon = "01d";
        }
        console.log(`Using mock weather conditions ${result.weather} for city of ${city} at latitude ${latitude}`);
        //#endregion

    } else {

        //#region Real API call
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.toString()}&lon=${longitude.toString()}&appid=${OPEN_WEATHER_API_KEY}&units=imperial`
        const response = await fetch(url);

        const data = await response.json() as OwmResponse;
        const weatherArray = data.weather;
        result.weather = weatherArray && weatherArray.length > 0 ? weatherArray[0].description : 'unknown';
        result.icon = weatherArray && weatherArray.length > 0 ? weatherArray[0].icon : '01d';
        result.temperatureFarenheit = data.main ? data.main.temp : 0;
        result.temperatureFeelsLike = data.main ? data.main.feels_like : 0;
        result.humidity = data.main ? data.main.humidity : 0;
        result.visibilityFeet = data.visibility ? data.visibility * 3.28084 : 0; // convert meters to feet
        result.windSpeedMilesPerHour = data.wind ? data.wind.speed : 0;
        result.windDirectionDegrees = data.wind ? data.wind.deg : 0;
        result.windGustMilesPerHour = data.wind && data.wind.gust ? data.wind.gust : 0;
        result.timezoneFromUtcSeconds = data.timezone ? data.timezone : 0;

        console.log(`Retrieved OpenWeatherMap conditions ${result.weather} for city of ${city} at latitude ${latitude}`);

        //#endregion
    }
    return result;
}


import type { Root as AlertsResponse } from "./nwsAlertResponse.ts";
import type { Root as PointsResponse } from "./nwsPointResponse.ts";
import type { Root as ForecastResponse } from "./nwsForecastResponse.ts";
import type { Root as HourlyForecastResponse } from "./nwsHourlyForecastResponse.ts";

const NWS_API_BASE = "https://api.weather.gov";
const USER_AGENT = "weather-app/1.0";

export async function getWeatherAlerts(stateCode: string): Promise<AlertsResponse | null> {

    const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`;
    const alertsData = await makeNWSRequest<AlertsResponse>(alertsUrl);

    return alertsData;
}

export async function getWeatherForecast(latitude: number, longitude: number):
    Promise<ForecastResponse | null> {

    // Get grid point data
    const pointsUrl = `${NWS_API_BASE}/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`;
    const pointsData = await makeNWSRequest<PointsResponse>(pointsUrl);

    if (!pointsData) {
        return null;
    }

    const forecastUrl = pointsData.properties?.forecast;
    if (!forecastUrl) {
        return null;
    }

    // Get forecast data
    const forecastData = await makeNWSRequest<ForecastResponse>(forecastUrl);
    return forecastData;

}

export async function getHourlyForecast(latitude: number, longitude: number):
    Promise<HourlyForecastResponse | null> {

    // Get grid point data
    const pointsUrl = `${NWS_API_BASE}/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`;
    const pointsData = await makeNWSRequest<PointsResponse>(pointsUrl);

    if (!pointsData) {
        return null;
    }

    const forecastUrl = pointsData.properties?.forecastHourly;
    if (!forecastUrl) {
        return null;
    }

    // Get forecast data
    const forecastData = await makeNWSRequest<HourlyForecastResponse>(forecastUrl);
    return forecastData;

}


async function makeNWSRequest<T>(url: string): Promise<T | null> {
    const headers = {
        "User-Agent": USER_AGENT,
        Accept: "application/geo+json",
    };

    try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return (await response.json()) as T;
    } catch (error) {
        console.error("Error making NWS request:", error);
        return null;
    }
}


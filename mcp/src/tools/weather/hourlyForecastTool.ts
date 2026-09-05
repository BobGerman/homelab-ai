import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { logger } from "../../logger.ts";
import { getHourlyForecast } from "./nationalWeatherService/nwsClient.ts";

const TOOL_NAME = "get_hourly_weather_forecast";

export default function register(server: McpServer): void {
    server.registerTool(
        TOOL_NAME,
        {
            description: "Get hourly weather forecast for a location",
            inputSchema: z.object({
                latitude: z
                    .number()
                    .min(-90)
                    .max(90)
                    .describe("Latitude of the location"),
                longitude: z
                    .number()
                    .min(-180)
                    .max(180)
                    .describe("Longitude of the location"),
            }),
        },
        async ({ latitude, longitude }, extra) => {

            const forecastData = await getHourlyForecast(latitude, longitude);

            if (!forecastData) {

                logger.info({ sessionId: extra.sessionId, requestId: extra.requestId },
                    `${TOOL_NAME} Tool failed to retrieve forecast for ${latitude}, ${longitude}`);

                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to retrieve forecast",
                        },
                    ],
                };
            }

            const periods = forecastData.properties?.periods || [];
            if (periods.length === 0) {
                return {
                    content: [
                        {
                            type: "text",
                            text: "No forecast periods available",
                        },
                    ],
                };
            }

            // Format forecast periods
            const formattedForecast = periods.map((period) => {
                const start = new Date(period.startTime);
                const end = new Date(period.endTime);
                return (
                    `${start.toLocaleTimeString('en-US') || "Unknown"} - ` +
                    `${end.toLocaleTimeString('en-US') || "Unknown"}: \n` +
                    `Temperature: ${period.temperature || "Unknown"}°${period.temperatureUnit || "F"}\n` +
                    `Wind: ${period.windSpeed || "Unknown"} ${period.windDirection || ""}\n` +
                    `Conditions: ${period.shortForecast || "No forecast available"}\n` +
                    "---"
                );
            });

            const forecastText = `Forecast for ${latitude}, ${longitude}:\n\n${formattedForecast.join("\n")}`;

            return {
                content: [
                    {
                        type: "text",
                        text: forecastText,
                    },
                ],
            };
        },

    );
}


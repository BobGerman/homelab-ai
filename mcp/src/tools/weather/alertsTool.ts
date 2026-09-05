import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { logger } from "../../logger.ts";
import { getWeatherAlerts } from "./nationalWeatherService/nwsClient.ts";
import type { Feature } from "./nationalWeatherService/nwsAlertResponse.ts";

const TOOL_NAME = "get_weather_alerts";

export default function register(server: McpServer): void {
    server.registerTool(
        TOOL_NAME,
        {
            title: "Weather alerts",
            description: "Get weather alerts for a state",
            inputSchema: z.object({
                state: z
                    .string()
                    .length(2)
                    .describe("Two-letter state code (e.g. CA, NY)"),
            }),
        },
        async ({ state }, extra) => {

            const stateCode = state.toUpperCase();
            const alertsData = await getWeatherAlerts(stateCode);

            if (!alertsData) {

                logger.info({ sessionId: extra.sessionId, requestId: extra.requestId },
                    `${TOOL_NAME} Tool failed to retrieve alerts data for ${stateCode}`);

                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to retrieve alerts data",
                        },
                    ],
                };
            }

            const features = alertsData.features || [];
            logger.info({ sessionId: extra.sessionId, requestId: extra.requestId },
                `${TOOL_NAME} Tool returned ${features.length} weather alerts for ${stateCode}`);

            if (!features.length) {

                return {
                    content: [
                        {
                            type: "text",
                            text: `No active alerts for ${stateCode}`,
                        },
                    ],
                };
            }

            const formattedAlerts = features.map(formatAlert);
            const alertsText = `Active alerts for ${stateCode}:\n\n${formattedAlerts.join("\n")}`;

            return {
                content: [
                    {
                        type: "text",
                        text: alertsText,
                    },
                ],
            };
        },
    );
}

// Format alert data
function formatAlert(feature: Feature): string {
    const props = feature.properties;
    return [
        `Event: ${props.event || "Unknown"}`,
        `Area: ${props.areaDesc || "Unknown"}`,
        `Severity: ${props.severity || "Unknown"}`,
        `Status: ${props.status || "Unknown"}`,
        `Headline: ${props.headline || "No headline"}`,
        "---",
    ].join("\n");
}


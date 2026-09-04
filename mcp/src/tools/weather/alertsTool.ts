// Portions in this module originated with the mcp tutorial:
// https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { logger } from "../../logger.ts";
import { createTextResult } from "../../lib/utils.ts";
import { makeNWSRequest } from "./nationalWeatherService/nwsClient.ts";
import type { Feature } from "./nationalWeatherService/nwsAlertResponse.ts";

const NWS_API_BASE = "https://api.weather.gov";
const USER_AGENT = "weather-app/1.0";

export default function register(server: McpServer): void {
    server.registerTool(
        "get_alerts",
        {
            description: "Get weather alerts for a state",
            inputSchema: z.object({
                state: z
                    .string()
                    .length(2)
                    .describe("Two-letter state code (e.g. CA, NY)"),
            }),
        },
        async ({ state }) => {
            const stateCode = state.toUpperCase();
            const alertsUrl = `${NWS_API_BASE}/alerts?area=${stateCode}`;
            const alertsData = await makeNWSRequest<AlertsResponse>(alertsUrl);

            if (!alertsData) {
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


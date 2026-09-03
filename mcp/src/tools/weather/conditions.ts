import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { logger } from "../../logger.ts";
import { createTextResult } from "../../lib/utils.ts";

import { getCurrentConditions } from "./api/owmService.ts";

const TOOL_NAME = "weatherConditions";

export default function register(server: McpServer): void {

    server.registerTool(
        TOOL_NAME,
        {
            title: "Current weather condition",
            description: "Retrieve information about Boston CodeCamp sessions.",
            inputSchema: {

                // searchQuery: z.string().optional().describe("The search query for finding sessions"),

                city: z.string().describe("city to get the conditions of"),
                latitude: z.number().describe("latitude of a point to get the conditions of"),
                longitude: z.number().describe("longitude of a point to get the conditions of")

            },
            outputSchema: {
                conditions: z.string().describe("JSON containing the current weather conditions"),
            },
            annotations: {
                readOnlyHint: true,
                idempotentHint: true,
                openWorldHint: false,
            },
        },
        (args, extra) => runTool(server, args, extra),
    );
}

// Code to run when the tool is executed
async function runTool(server: McpServer, args: any, extra: { sessionId?: string; requestId: unknown }): Promise<any> {

    const city: string = args.city?.toLowerCase();
    const latitude: number = Number(args.latitude);
    const longitude: number = Number(args.longitude);

    let data = await getCurrentConditions(city, latitude, longitude);

    logger.info({ data, sessionId: extra.sessionId, requestId: extra.requestId },
        `${TOOL_NAME} Tool returned weather conditions for ${args.city} and got ${data.weather}`);

    return createTextResult({ conditions: JSON.stringify(data) });
}

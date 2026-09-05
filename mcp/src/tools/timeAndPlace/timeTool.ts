import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { logger } from "../../logger.ts";


const TOOL_NAME = "get_date_and_time";

export default function register(server: McpServer): void {

    server.registerTool(
        TOOL_NAME,
        {
            title: "Get date and time",
            description: "Retrieve current date and time for a location",
            inputSchema: {
                latitude: z
                    .number()
                    .describe("latitude of a location"),
                longitude: z
                    .number()
                    .describe("longitude of a location")

            },
            annotations: {
                readOnlyHint: true,
                idempotentHint: true,
                openWorldHint: false,
            },
        },
        async (args: any, extra: { sessionId?: string; requestId: unknown }): Promise<any> => {

            const latitude: number = Number(args.latitude);
            const longitude: number = Number(args.longitude);

            let data = await getCurrentConditions(latitude, longitude);

            logger.info({ sessionId: extra.sessionId, requestId: extra.requestId },
                `${TOOL_NAME} tool returned weather conditions for ${args.latitude}, ${args.longitude} and got ${data.weather}`);

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(data)
                    }
                ]
            }
        }
    )
};

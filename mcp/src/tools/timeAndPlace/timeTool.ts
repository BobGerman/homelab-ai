import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { logger } from "../../logger.ts";
import tzlookup from "tz-lookup";

const TOOL_NAME = "get_date_and_time";

export default function register(server: McpServer): void {
    tzlookup;
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

            const timeZone = tzlookup(latitude, longitude);
            const now = new Date();
            const utcDateTime = new Intl.DateTimeFormat("en-us",
                {
                    dateStyle: "full",
                    timeStyle: "long",
                    timeZone: "utc",
                }
            ).format(now);
            const localDateTime = new Intl.DateTimeFormat("en-us",
                {
                    dateStyle: "full",
                    timeStyle: "long",
                    timeZone: timeZone,
                }
            ).format(now);

            logger.info({ sessionId: extra.sessionId, requestId: extra.requestId },
                `${TOOL_NAME} tool returned time zone ${timeZone} for ${args.latitude}, ${args.longitude}`);

            return {
                content: [
                    {
                        type: "text",
                        text: `time zone: ${timeZone}\n` +
                            `current date time: ${localDateTime}\n` +
                            `utc date and time: ${utcDateTime}`
                    }
                ]
            }
        }
    )
};

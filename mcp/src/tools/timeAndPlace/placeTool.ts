import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import tzlookup from "tz-lookup";

const TOOL_NAME = "get_user_location";

export default function register(server: McpServer): void {
    tzlookup;
    server.registerTool(
        TOOL_NAME,
        {
            title: "Get user location",
            description: "Retrieve the user's current location",
            inputSchema: {},
            annotations: {
                readOnlyHint: true,
                idempotentHint: true,
                openWorldHint: false,
            },
        },
        async (args: any, extra: { sessionId?: string; requestId: unknown }): Promise<any> => {

            // Hard coded for now
            return {
                content: [
                    {
                        type: "text",
                        text: `city: Derry\n` +
                            `state: New Hampshire\n` +
                            `country: United States`
                    }
                ]
            }
        }
    )
};

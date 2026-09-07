import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { logger } from "../../logger.ts";
import { searchFoodNutritionalData } from "./usda/fdcClient.ts";

const TOOL_NAME = "search_nutrition_data";

export default function register(server: McpServer): void {
    server.registerTool(
        TOOL_NAME,
        {
            title: "Search food nutrition data",
            description: "Search the USDA Food Data Central database",
            inputSchema: z.object({
                query: z
                    .string()
                    .describe("search query"),
            }),
            annotations: {
                readOnlyHint: true,
                idempotentHint: true,
                openWorldHint: false,
            },

        },
        async ({ query }, extra) => {

            const nutritionData = await searchFoodNutritionalData(query);

            if (!nutritionData) {

                logger.info({ sessionId: extra.sessionId, requestId: extra.requestId },
                    `${TOOL_NAME} Tool failed to retrieve nutrition data for ${query}`);

                return {
                    content: [
                        {
                            type: "text",
                            text: "Failed to retrieve nutrition data",
                        },
                    ],
                };
            }

            const foods = nutritionData || [];
            logger.info({ sessionId: extra.sessionId, requestId: extra.requestId },
                `${TOOL_NAME} Tool returned ${foods.length} foods for ${query}`);

            if (!foods.length) {

                return {
                    content: [
                        {
                            type: "text",
                            text: `No foods found matching query ${query}`,
                        },
                    ],
                };
            }

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(foods),
                    },
                ],
            };
        },
    );
}

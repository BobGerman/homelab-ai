import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createTextResult } from "../../lib/utils.ts";
import { logger } from "../../logger.ts";
import type { FoodNutrient } from "./usda/fdcFoodSearchResponse.ts";
import { searchFoodNutritionalData } from "./usda/fdcClient.ts";

const TOOL_NAME = "search_nutrition_data";
const NUTRIENT_LIST = ["protein", "energy", "fiber", "carbohydrates"];

export default function register(server: McpServer): void {
    server.registerTool(
        TOOL_NAME,
        {
            title: "Search food nutrition data",
            description:
                `Search the USDA Food Data Central database.`,
            inputSchema: z.object({
                query: z.string()
                    .describe("search query"),
            }),
            outputSchema: z.object({
                totalFoods: z.number()
                    .describe("Number of foods matching your query"),
                returnedFoods: z.number()
                    .describe("Number of foods returned in this response"),
                foods: z.array(z.object({
                    name: z.string()
                        .describe("Name of food"),
                    brand: z.string()
                        .describe("Brand name if any"),
                    servingSize: z.number()
                        .describe("Size of a single serving"),
                    servingSizeUnit: z.string()
                        .describe("Unit of the serving size"),
                    ingredients: z.string()
                        .describe("List of ingredients"),
                    nutrients: z.array(z.object({
                        name: z.string()
                            .describe("Name of this nutrient"),
                        amount: z.string()
                            .describe("Amount of this nutrient in a single serving")
                    }))
                        .describe("Nutrients in a single serving")
                }))
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

            const foods = nutritionData?.foods || [];
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

            const result = {
                totalFoods: Number(nutritionData.totalHits),
                returnedFoods: foods.length,
                foods: foods.map(f => ({
                    name: f.description,
                    brand: f.brandOwner || "",
                    servingSize: f.servingSize || 1,
                    servingSizeUnit: f.servingSizeUnit || "",
                    ingredients: f.ingredients || "",
                    nutrients: f.foodNutrients?.flatMap(n => {
                        if (showNutrient(n)) {
                            return [{
                                name: n.nutrientName || "",
                                amount: n.value + " " + n.unitName,
                            }];
                        } else {
                            return [];
                        }
                    })
                }))
            };

            return createTextResult(result);
        },
    );
}

function showNutrient(n: FoodNutrient): boolean {
    for (const nutrient of NUTRIENT_LIST) {
        if (nutrient.indexOf(n.nutrientName.toLowerCase()) >= 0) {
            return true;
        }
    }
    return false;
}
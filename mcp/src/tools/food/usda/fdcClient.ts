import type { Root as FoodSearchResponse } from "./fdcFoodSearchResponse.ts";

const USDA_API_BASE = "https://api.nal.usda.gov/fdc/v1";
const USER_AGENT = "food-mcp/1.0";

export async function searchFoodNutritionalData(query: string):
    Promise<FoodSearchResponse | null> {

    const USDA_API_KEY = process.env.USDA_API_KEY;

    if (!USDA_API_KEY) {

        console.log(`No USDA API key`);
        return null;

    } else {

        const url = `${USDA_API_BASE}/foods/search/?query=${query}&api_key=${USDA_API_KEY}`;

        try {
            const response = await fetch(url);//, { headers });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return (await response.json() as FoodSearchResponse);
        } catch (error) {
            console.error("Error making NWS request:", error);
            return null;
        }
    }
}
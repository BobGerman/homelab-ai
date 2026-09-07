import type { Root as FoodListResponse } from "./fdcFoodListResponse.ts";

const USDA_API_BASE = "https://api.nal.usda.gov/fdc/v1";
const USER_AGENT = "food-mcp/1.0";

export async function searchFoodNutritionalData(query: string):
    Promise<FoodListResponse | null> {

    const USDA_API_KEY = process.env.USDA_API_KEY;

    if (!USDA_API_KEY) {

        console.log(`No USDA API key`);
        return null;

    } else {

        const headers = {
            "User-Agent": USER_AGENT,
            Accept: "application/geo+json",
        };
        const url = `${USDA_API_BASE}/foods/list/?query=${query}&api_key=${USDA_API_KEY}`;

        try {
            const response = await fetch(url);//, { headers });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return (await response.json() as FoodListResponse);
        } catch (error) {
            console.error("Error making NWS request:", error);
            return null;
        }
    }
}
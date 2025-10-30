
import { GoogleGenAI } from "@google/genai";
import { InventoryItem, Sale } from "../types";

// IMPORTANT: This key is a placeholder and should be handled via environment variables in a real application.
// The execution environment for this code is expected to have `process.env.API_KEY` pre-configured.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getDashboardInsights = async (inventory: InventoryItem[], sales: Sale[]): Promise<string> => {
  if (!API_KEY) {
    return "AI features are disabled because the API key is not configured.";
  }

  const inventorySummary = inventory
    .map(item => `  - ${item.Name} (ID: ${item.ID}): ${item.Stock} in stock. Low stock level is ${item.LowLevel}.`)
    .join('\n');

  const salesSummary = sales
    .map(sale => `  - Sale ${sale.SaleID}: ${sale.Items.length} items, Total: $${sale.Total.toFixed(2)}`)
    .join('\n');

  const prompt = `
    You are an expert ERP/POS system analyst for an auto parts store.
    Analyze the following real-time data and provide actionable business insights.
    Be concise and use bullet points.

    Current Inventory Status:
    ${inventorySummary}

    Recent Sales Data:
    ${salesSummary}

    Based on this data, provide:
    1.  **Top-selling products:** Identify products that are selling frequently.
    2.  **Urgent Reorder Recommendations:** List items that are below their low stock level.
    3.  **Potential Slow-Movers:** Mention any items that have high stock but don't appear in recent sales.
    4.  **A surprising trend or anomaly:** Point out anything unusual or interesting in the data.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching insights from Gemini API:", error);
    return "Could not retrieve AI insights. The API might be down or the request failed. Please check the console for more details.";
  }
};

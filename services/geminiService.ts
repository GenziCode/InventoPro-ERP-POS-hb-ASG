
import { GoogleGenAI } from "@google/genai";
import { InventoryItem, Sale } from "../types";

// Fix: Adhering to @google/genai guidelines to use process.env.API_KEY directly for initialization.
// The guidelines state to assume this variable is pre-configured and accessible in the execution context.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDashboardInsights = async (inventory: InventoryItem[], sales: Sale[]): Promise<string> => {
  // Fix: Removed conditional check for the 'ai' client. Per guidelines, we assume the API key is always present
  // and the client is successfully initialized.

  const inventorySummary = inventory
    .map(item => `  - ${item.Name} (ID: ${item.ID}): ${item.Stock} in stock. Low stock level is ${item.LowLevel}.`)
    .join('\n');

  const salesSummary = sales
    .map(sale => `  - Sale ${sale.SaleID}: ${sale.Items.length} items, Total: $${sale.Total.toFixed(2)}`)
    .join('\n');

  const prompt = `
    You are an expert ERP/POS system analyst for an auto parts store.
    Analyze the following real-time data and provide actionable business insights.
    Be concise and use bullet points formatted as markdown.

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

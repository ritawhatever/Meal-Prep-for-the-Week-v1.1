import { GoogleGenAI, Type } from "@google/genai";
import { WeeklyPlan } from "../types";

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    name: { type: Type.STRING },
    origin: { type: Type.STRING },
    timeMinutes: { type: Type.NUMBER },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          amount: { type: Type.STRING },
        },
        required: ["name", "amount"],
      },
    },
    spices: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          amount: { type: Type.STRING },
        },
        required: ["name", "amount"],
      },
    },
    miseEnPlace: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          instruction: { type: Type.STRING },
        },
        required: ["title", "instruction"],
      },
    },
    cookingSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
    proTips: { type: Type.ARRAY, items: { type: Type.STRING } },
    isFreezable: { type: Type.BOOLEAN },
    searchUrl: { type: Type.STRING },
  },
  required: [
    "id", 
    "name", 
    "origin", 
    "timeMinutes", 
    "ingredients", 
    "spices", 
    "miseEnPlace", 
    "cookingSteps", 
    "proTips", 
    "isFreezable", 
    "searchUrl"
  ],
};

export const generateMealPlan = async (
  proteins: string[],
  veggies: string[],
  carbs: string[]
): Promise<WeeklyPlan> => {
  // Use pre-configured API key from environment
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `Act as the Ship's Master Chef on a global voyage for Captains Andrea and Rita. 
  You generate adventurous Monday to Friday (Lunch and Dinner) meal plans for 2 people.
  
  CONSTRAINTS:
  1. Use strictly the selected 3 proteins throughout the 10 meals.
  2. Each recipe MUST be a "culinary treasure" from a different port of call (Asian, Mediterranean, Caribbean, etc.).
  3. Include beginner-friendly preparation steps.
  4. Spice measurements must be precise.
  5. Weekend prep tasks must be designed as "Sunday Docking Tasks" so daily work is <30 mins. Include an estimated prepTimeMinutes for each docking task group.
  6. Recipe names should sound like items from a Ship's Logbook or Explorers' Manual.`;

  const prompt = `Selected Provisions: ${proteins.join(", ")}.
  Ship's Garden: ${veggies.length > 0 ? veggies.join(", ") : "Various global greens"}.
  Merchant Grains: ${carbs.length > 0 ? carbs.join(", ") : "Assorted carbs"}.
  
  Generate the full weekly plan in JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts: [{ text: prompt }] },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            meals: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.STRING },
                  lunch: recipeSchema,
                  dinner: recipeSchema,
                },
                required: ["day", "lunch", "dinner"],
              },
            },
            weekendPrep: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  prepTimeMinutes: { type: Type.NUMBER },
                  tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["title", "tasks", "prepTimeMinutes"],
              },
            },
          },
          required: ["meals", "weekendPrep"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("The galley is empty. No response.");
    return JSON.parse(text) as WeeklyPlan;
  } catch (error: any) {
    console.error("Meal Generation Error:", error);
    throw new Error("A storm disrupted the galley! Check your connection and try again.");
  }
};
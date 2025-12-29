
import { GoogleGenAI, Type } from "@google/genai";
import { WeeklyPlan } from "../types";

// Always initialize the client with an options object containing the apiKey.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
  const prompt = `Act as a world-class chef and meal prep expert. Generate a Monday to Friday (Lunch and Dinner) meal plan for 2 people.
  
  CONTEXT:
  - User Proteins: ${proteins.join(", ")} (Strictly use these 3).
  - User Preferred Veggies: ${veggies.length > 0 ? veggies.join(", ") : "None selected (you choose)"}.
  - User Preferred Carbs: ${carbs.length > 0 ? carbs.join(", ") : "None selected (you choose)"}.
  
  CONSTRAINTS:
  1. Supplement ingredients with additional global-appropriate choices to reach exactly 6 types of veggies and 3 types of carbs total across the entire 10-meal plan.
  2. Each recipe MUST be distinct and unique, representing a wide variety of global cuisines (Asian, African, European, Latin, Mediterranean, etc.).
  3. Include beginner-friendly mise en place steps.
  4. Spices MUST include specific amounts in ml or g.
  5. Weekend prep tasks must ensure daily active cooking is <30 minutes.
  6. Provide a valid Google Search URL for the name of each dish in the format: https://www.google.com/search?q=[Recipe+Name+Encoded]
  
  Output a JSON object matching the provided schema.`;

  try {
    // Using 'gemini-3-pro-preview' for complex reasoning, planning, and constraint fulfillment tasks.
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: { parts: [{ text: prompt }] },
      config: {
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
                  tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["title", "tasks"],
              },
            },
          },
          required: ["meals", "weekendPrep"],
        },
      },
    });

    // Accessing the generated text using the .text property as per the latest SDK.
    const text = response.text;
    if (!text) throw new Error("No response from AI chef.");

    const data = JSON.parse(text);
    return data as WeeklyPlan;
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    if (error.message?.includes('400')) {
      throw new Error("The request was rejected by the server. Try picking different ingredient combinations.");
    }
    throw new Error("The chef's recipe book was messy. Please try generating again.");
  }
};


export interface Ingredient {
  name: string;
  amount: string; // e.g., "200g", "15ml"
}

export interface PrepStep {
  title: string;
  instruction: string;
}

export interface Recipe {
  id: string;
  name: string;
  origin: string; // Country/Region
  timeMinutes: number;
  ingredients: Ingredient[];
  spices: Ingredient[];
  miseEnPlace: PrepStep[];
  cookingSteps: string[];
  proTips: string[];
  isFreezable: boolean;
  searchUrl: string;
}

export interface DayPlan {
  day: string; // Monday...Friday
  lunch: Recipe;
  dinner: Recipe;
}

export interface WeeklyPlan {
  meals: DayPlan[];
  weekendPrep: {
    title: string;
    tasks: string[];
  }[];
}

export interface SelectionState {
  proteins: string[];
  veggies: string[];
  carbs: string[];
}

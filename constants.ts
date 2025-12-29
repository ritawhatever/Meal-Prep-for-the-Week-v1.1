
export const PROTEIN_GROUPS = [
  {
    label: "Beef & Lamb",
    items: ["Sirloin Steak", "Ribeye Steak", "Ground Beef", "Beef Brisket", "Flank Steak", "Lamb Loin", "Lamb Shank"]
  },
  {
    label: "Pork",
    items: ["Pork Loin", "Pork Belly", "Ground Pork", "Smoked Ham", "Chorizo", "Pork Ribs", "Bacon"]
  },
  {
    label: "Poultry",
    items: ["Chicken Breast", "Chicken Thigh", "Ground Turkey", "Turkey Breast", "Duck Breast", "Chicken Wings", "Ground Chicken", "Quail", "Goose", "Cornish Hen"]
  },
  {
    label: "Seafood",
    items: ["Shrimp", "Salmon Fillet", "Sea Scallops", "Cod Fillet", "Tuna Steak", "Blue Mussels", "Chilean Sea Bass", "Lobster Tail", "Lump Crab Meat", "Rainbow Trout", "Octopus", "Sardines", "Atlantic Halibut", "Squid/Calamari", "Little Neck Clams"]
  },
  {
    label: "Plant-Based",
    items: ["Tofu (Firm)", "Tempeh", "Seitan", "Chickpeas", "Red Lentils", "Black Beans", "Edamame", "Kidney Beans", "Fava Beans", "Cannellini Beans"]
  },
  {
    label: "Dairy & Eggs",
    items: ["Large Eggs", "Paneer Cheese", "Greek Yogurt", "Cottage Cheese", "Halloumi Cheese"]
  }
];

export const PROTEINS = PROTEIN_GROUPS.flatMap(group => group.items);

export const VEGGIES = [
  "Broccoli", "Spinach", "Bell Peppers", "Zucchini", "Carrots", "Cauliflower", 
  "Kale", "Asparagus", "Green Beans", "Brussels Sprouts", "Mushrooms", "Onion", 
  "Garlic", "Eggplant", "Cucumber", "Tomato", "Cabbage", "Bok Choy", "Peas", 
  "Corn", "Celery", "Radish", "Butternut Squash", "Leek", "Arugula", "Fennel", 
  "Okra", "Snow Peas", "Watercress", "Artichoke"
];

export const CARBS = [
  "White Rice", "Brown Rice", "Quinoa", "Whole Wheat Pasta", "Fusilli", "Sweet Potato", 
  "Russet Potato", "Red Potato", "Couscous", "Bulgur", "Farro", "Barley", 
  "Oats", "Sourdough Bread", "Baguette", "Corn Tortillas", "Rice Noodles", 
  "Buckwheat", "Millet", "Polenta", "Potato Gnocchi", "Pita Bread", "Naan", 
  "Orzo", "Vermicelli", "Udon Noodles", "Soba Noodles", "Basmati Rice", 
  "Jasmine Rice", "Wild Rice"
];

export const MAX_PROTEINS = 3;
export const MAX_VEGGIES = 6;
export const MAX_CARBS = 3;

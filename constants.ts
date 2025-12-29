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

export const VEGGIE_GROUPS = [
  {
    label: "🛳️ Port Greens",
    items: ["Spinach", "Kale", "Arugula", "Bok Choy", "Cabbage", "Watercress"]
  },
  {
    label: "⚓ Garden Roots",
    items: ["Carrots", "Radish", "Butternut Squash", "Fennel"]
  },
  {
    label: "🌿 Island Florets",
    items: ["Broccoli", "Cauliflower", "Brussels Sprouts"]
  },
  {
    label: "🎋 Galley Stems",
    items: ["Asparagus", "Green Beans", "Celery", "Okra", "Snow Peas"]
  },
  {
    label: "🧅 Ship's Alliums",
    items: ["Onion", "Garlic", "Leek"]
  },
  {
    label: "🍅 Tropical Harvest",
    items: ["Bell Peppers", "Zucchini", "Mushrooms", "Eggplant", "Cucumber", "Tomato", "Peas", "Corn", "Artichoke"]
  }
];

export const VEGGIES = VEGGIE_GROUPS.flatMap(group => group.items);

export const CARB_GROUPS = [
  {
    label: "🌾 Merchant Grains",
    items: ["White Rice", "Brown Rice", "Quinoa", "Couscous", "Bulgur", "Farro", "Barley", "Basmati Rice", "Jasmine Rice", "Wild Rice", "Millet"]
  },
  {
    label: "🍝 Sailor's Pasta",
    items: ["Whole Wheat Pasta", "Fusilli", "Rice Noodles", "Buckwheat", "Udon Noodles", "Soba Noodles", "Orzo", "Vermicelli"]
  },
  {
    label: "🥔 Galley Roots",
    items: ["Sweet Potato", "Russet Potato", "Red Potato", "Potato Gnocchi", "Polenta"]
  },
  {
    label: "🥖 Rations & Flatbreads",
    items: ["Sourdough Bread", "Baguette", "Corn Tortillas", "Pita Bread", "Naan"]
  },
  {
    label: "🥣 Morning Grains",
    items: ["Oats"]
  }
];

export const CARBS = CARB_GROUPS.flatMap(group => group.items);

export const MAX_PROTEINS = 3;
export const MAX_VEGGIES = 6;
export const MAX_CARBS = 3;
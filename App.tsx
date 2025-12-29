
import React, { useState } from 'react';
import { PROTEIN_GROUPS, VEGGIES, CARBS, MAX_PROTEINS, MAX_VEGGIES, MAX_CARBS } from './constants';
import { SelectionState, WeeklyPlan, Recipe } from './types';
import { generateMealPlan } from './services/geminiService';
import { IngredientSelector } from './components/IngredientSelector';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';

const App: React.FC = () => {
  const [step, setStep] = useState<'selection' | 'generating' | 'results'>('selection');
  const [selection, setSelection] = useState<SelectionState>({
    proteins: [],
    veggies: [],
    carbs: []
  });
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'weekly' | 'weekend'>('weekly');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const toggleSelection = (category: keyof SelectionState, item: string) => {
    setSelection(prev => {
      const current = prev[category];
      const max = category === 'proteins' ? MAX_PROTEINS : category === 'veggies' ? MAX_VEGGIES : MAX_CARBS;
      
      if (current.includes(item)) {
        return { ...prev, [category]: current.filter(i => i !== item) };
      } else if (current.length < max) {
        return { ...prev, [category]: [...current, item] };
      }
      return prev;
    });
  };

  const autoFill = (category: keyof SelectionState) => {
    const max = category === 'veggies' ? MAX_VEGGIES : MAX_CARBS;
    const source = category === 'veggies' ? VEGGIES : CARBS;
    
    setSelection(prev => {
      const current = [...prev[category]];
      const available = source.filter(item => !current.includes(item));
      const needed = max - current.length;
      
      const shuffled = [...available].sort(() => 0.5 - Math.random());
      const additions = shuffled.slice(0, needed);
      
      return { ...prev, [category]: [...current, ...additions] };
    });
  };

  const handleGenerate = async () => {
    if (selection.proteins.length < MAX_PROTEINS) {
      setError(`Please select exactly ${MAX_PROTEINS} proteins to continue.`);
      return;
    }

    setStep('generating');
    setError(null);
    try {
      const result = await generateMealPlan(selection.proteins, selection.veggies, selection.carbs);
      setPlan(result);
      setStep('results');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'The AI encountered an issue. Please try again.');
      setStep('selection');
    }
  };

  const isSelectionComplete = selection.proteins.length === MAX_PROTEINS;

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setStep('selection')}>
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight hidden sm:block">Global Prep & Plate</h1>
          </div>
          {step === 'results' && (
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('weekly')}
                className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'weekly' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
              >
                Weekly Plan
              </button>
              <button 
                onClick={() => setActiveTab('weekend')}
                className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'weekend' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}
              >
                Weekend Prep
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {step === 'selection' && (
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Craft Your Perfect Week</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Explore our expanded library of 50+ proteins. Pick 3 and let our global chefs design your week.
              </p>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex items-center gap-3 animate-bounce">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="font-medium">{error}</span>
              </div>
            )}

            <IngredientSelector 
              title="1. Main Proteins" 
              options={PROTEIN_GROUPS} 
              selected={selection.proteins} 
              max={MAX_PROTEINS}
              onToggle={(item) => toggleSelection('proteins', item)}
            />

            <IngredientSelector 
              title="2. Veggies (Optional)" 
              options={VEGGIES} 
              selected={selection.veggies} 
              max={MAX_VEGGIES}
              onToggle={(item) => toggleSelection('veggies', item)}
              onAutoFill={() => autoFill('veggies')}
            />

            <IngredientSelector 
              title="3. Carbs (Optional)" 
              options={CARBS} 
              selected={selection.carbs} 
              max={MAX_CARBS}
              onToggle={(item) => toggleSelection('carbs', item)}
              onAutoFill={() => autoFill('carbs')}
            />

            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-40">
              <button
                onClick={handleGenerate}
                className={`
                  w-full py-5 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 transform
                  ${isSelectionComplete 
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1 active:scale-95' 
                    : 'bg-slate-200 text-slate-400'
                  }
                `}
              >
                {isSelectionComplete ? 'Generate My Plan' : `Select ${MAX_PROTEINS - selection.proteins.length} More Proteins`}
              </button>
            </div>
          </div>
        )}

        {step === 'generating' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-8 border-indigo-100 rounded-full"></div>
              <div className="absolute inset-0 border-8 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">The Chef is Thinking...</h2>
            <p className="text-slate-500 text-center animate-pulse">Designing your global menu and organizing your weekend prep.</p>
          </div>
        )}

        {step === 'results' && plan && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            {activeTab === 'weekly' ? (
              <div className="space-y-12 pb-20">
                {plan.meals.map((dayPlan, idx) => (
                  <section key={dayPlan.day} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                    <div className="flex items-center gap-4 mb-6">
                      <h3 className="text-2xl font-black text-slate-900">{dayPlan.day}</h3>
                      <div className="h-px flex-1 bg-slate-200"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <RecipeCard type="Lunch" recipe={dayPlan.lunch} onOpen={() => setSelectedRecipe(dayPlan.lunch)} />
                      <RecipeCard type="Dinner" recipe={dayPlan.dinner} onOpen={() => setSelectedRecipe(dayPlan.dinner)} />
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
                <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-xl">
                  <h2 className="text-3xl font-bold mb-4">Your Weekend Blueprint</h2>
                  <p className="opacity-90 leading-relaxed">
                    Complete these tasks on Sunday to reduce your daily cooking to just heating and final assembly. 
                  </p>
                </div>
                
                <div className="grid gap-6">
                  {plan.weekendPrep.map((group, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">{i + 1}</span>
                        {group.title}
                      </h4>
                      <ul className="space-y-3">
                        {group.tasks.map((task, j) => (
                          <li key={j} className="flex gap-3 text-slate-600 items-start">
                            <input type="checkbox" className="mt-1.5 w-4 h-4 rounded border-slate-300 text-indigo-600" />
                            <span className="leading-tight">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center pt-8">
                  <button 
                    onClick={() => { setStep('selection'); setPlan(null); }}
                    className="text-slate-400 hover:text-indigo-600 font-bold flex items-center gap-2 transition-colors"
                  >
                    Start Over with New Ingredients
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
};

export default App;

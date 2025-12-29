import React, { useState } from 'react';
import { PROTEIN_GROUPS, VEGGIES, CARBS, MAX_PROTEINS, MAX_VEGGIES, MAX_CARBS } from './constants';
import { SelectionState, WeeklyPlan, Recipe } from './types';
import { generateMealPlan } from './services/geminiService';
import { IngredientSelector } from './components/IngredientSelector';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';

const CatIcons = ({ type }: { type: 'orange' | 'black' }) => (
  <div className="relative w-14 h-14 flex-shrink-0 drop-shadow-md">
    <svg viewBox="0 0 100 100" className={`w-full h-full ${type === 'orange' ? 'text-orange-500' : 'text-slate-800'}`}>
      <path fill="currentColor" d="M20 80 Q50 90 80 80 L80 40 Q80 20 60 20 L40 20 Q20 20 20 40 Z" />
      <path fill="currentColor" d="M20 40 L10 10 L35 25 Z" />
      <path fill="currentColor" d="M80 40 L90 10 L65 25 Z" />
      <circle cx="35" cy="45" r="5" fill="white" />
      <circle cx="65" cy="45" r="5" fill="white" />
      <circle cx="35" cy="45" r="2" fill="black" />
      <circle cx="65" cy="45" r="2" fill="black" />
      {/* Sailor Hat */}
      <path fill="white" stroke="#1e3a8a" strokeWidth="2" d="M30 22 Q50 8 70 22 L75 27 Q50 37 25 27 Z" />
      <circle cx="50" cy="17" r="3" fill="#0284c7" />
    </svg>
  </div>
);

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

  const handleGenerate = async () => {
    if (selection.proteins.length < MAX_PROTEINS) {
      setError(`Captains Andrea & Rita, we need ${MAX_PROTEINS} proteins to clear the harbor!`);
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
      setError('A kraken blocked our route! Please try to set sail again.');
      setStep('selection');
    }
  };

  const isSelectionComplete = selection.proteins.length === MAX_PROTEINS;

  return (
    <div className="min-h-screen pb-20 relative">
      <header className="bg-white/90 backdrop-blur-md border-b-4 border-blue-600 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setStep('selection')}>
            <div className="flex -space-x-4">
              <CatIcons type="orange" />
              <CatIcons type="black" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-blue-900 tracking-tight leading-none">THE CAPTAINS' TABLE</h1>
              <p className="text-xs font-bold text-green-600 uppercase tracking-widest mt-1">Voyage of Andrea & Rita</p>
            </div>
          </div>
          {step === 'results' && (
            <div className="flex bg-blue-50 p-1.5 rounded-2xl border border-blue-200">
              <button 
                onClick={() => setActiveTab('weekly')}
                className={`px-6 py-2 text-xs font-black rounded-xl transition-all ${activeTab === 'weekly' ? 'bg-blue-600 shadow-lg text-white' : 'text-blue-400 hover:text-blue-600'}`}
              >
                THE VOYAGE
              </button>
              <button 
                onClick={() => setActiveTab('weekend')}
                className={`px-6 py-2 text-xs font-black rounded-xl transition-all ${activeTab === 'weekend' ? 'bg-green-600 shadow-lg text-white' : 'text-green-400 hover:text-green-600'}`}
              >
                THE DOCKING
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        {step === 'selection' && (
          <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-green-600 rounded-full text-white shadow-2xl ring-4 ring-green-100">
                 <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </div>
              <h2 className="text-5xl font-black text-blue-950 mb-4 italic leading-tight">Prepare the Cargo!</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
                Andrea & Rita, select your provisions below. The cats are ready to stand watch over the pantry!
              </p>
            </div>

            {error && (
              <div className="mb-10 p-6 bg-red-50 border-l-8 border-red-500 text-red-900 rounded-2xl flex items-center gap-4 animate-bounce shadow-xl">
                <span className="text-2xl">⚠️</span>
                <span className="font-black italic">{error}</span>
              </div>
            )}

            <div className="space-y-6">
              <IngredientSelector 
                title="🛳️ Main Provisions" 
                options={PROTEIN_GROUPS} 
                selected={selection.proteins} 
                max={MAX_PROTEINS}
                onToggle={(item) => toggleSelection('proteins', item)}
              />

              <IngredientSelector 
                title="🌿 Island Greens" 
                options={VEGGIES} 
                selected={selection.veggies} 
                max={MAX_VEGGIES}
                onToggle={(item) => toggleSelection('veggies', item)}
                onAutoFill={() => {
                  const needed = MAX_VEGGIES - selection.veggies.length;
                  const available = VEGGIES.filter(v => !selection.veggies.includes(v));
                  const random = available.sort(() => 0.5 - Math.random()).slice(0, needed);
                  setSelection(prev => ({ ...prev, veggies: [...prev.veggies, ...random] }));
                }}
              />

              <IngredientSelector 
                title="🌾 Merchant Grains" 
                options={CARBS} 
                selected={selection.carbs} 
                max={MAX_CARBS}
                onToggle={(item) => toggleSelection('carbs', item)}
                onAutoFill={() => {
                  const needed = MAX_CARBS - selection.carbs.length;
                  const available = CARBS.filter(c => !selection.carbs.includes(c));
                  const random = available.sort(() => 0.5 - Math.random()).slice(0, needed);
                  setSelection(prev => ({ ...prev, carbs: [...prev.carbs, ...random] }));
                }}
              />
            </div>

            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-md px-6 z-40">
              <button
                onClick={handleGenerate}
                className={`
                  w-full py-7 rounded-[32px] font-black text-2xl shadow-2xl transition-all duration-300 transform border-b-8
                  ${isSelectionComplete 
                    ? 'bg-blue-700 text-white border-blue-900 hover:-translate-y-2 active:translate-y-0 active:border-b-0 shadow-blue-900/40' 
                    : 'bg-slate-300 text-slate-500 border-slate-400 cursor-not-allowed'
                  }
                `}
              >
                {isSelectionComplete ? 'SET SAIL FOR DINNER! ⚓' : `SELECT ${MAX_PROTEINS - selection.proteins.length} PROTEINS`}
              </button>
            </div>
          </div>
        )}

        {step === 'generating' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="relative w-64 h-64 mb-12">
               <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                  <svg className="w-32 h-32 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2,18L21,18L21,20L3,20L2,18M21,17C21,17 19.5,13.5 17,11C14.5,8.5 11,7 11,7L11,17L21,17M10,17L10,4C10,4 8,6 5.5,9C3,12 2,15 2,15L10,17Z" />
                  </svg>
               </div>
               <div className="absolute inset-0 border-8 border-green-100 rounded-full border-t-blue-700 animate-spin"></div>
               <div className="absolute -top-6 -right-6 animate-bounce">
                 <CatIcons type="black" />
               </div>
               <div className="absolute -bottom-6 -left-6 animate-bounce" style={{ animationDelay: '500ms' }}>
                 <CatIcons type="orange" />
               </div>
            </div>
            <h2 className="text-4xl font-black text-blue-950 mb-3 italic">CHARTING THE FLAVOR ROUTE...</h2>
            <p className="text-green-600 font-black tracking-[0.3em] uppercase text-sm">Andrea & Rita, your feast is being prepared!</p>
          </div>
        )}

        {step === 'results' && plan && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            {activeTab === 'weekly' ? (
              <div className="space-y-20 pb-24">
                {plan.meals.map((dayPlan) => (
                  <section key={dayPlan.day} className="relative">
                    <div className="flex items-center gap-6 mb-10">
                      <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white px-10 py-3 rounded-3xl font-black text-2xl italic shadow-xl -rotate-1 border-2 border-white">
                        {dayPlan.day}
                      </div>
                      <div className="h-1 flex-1 bg-blue-100 rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-10">
                      <RecipeCard type="Lunch" recipe={dayPlan.lunch} onOpen={() => setSelectedRecipe(dayPlan.lunch)} />
                      <RecipeCard type="Dinner" recipe={dayPlan.dinner} onOpen={() => setSelectedRecipe(dayPlan.dinner)} />
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-12 pb-32">
                <div className="bg-blue-800 text-white p-12 rounded-[50px] shadow-3xl relative overflow-hidden border-4 border-white">
                  <div className="absolute top-0 right-0 p-10 opacity-10">
                     <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z"/></svg>
                  </div>
                  <h2 className="text-5xl font-black mb-6 italic">Sunday Docking Tasks</h2>
                  <p className="text-blue-100 text-xl leading-relaxed font-bold max-w-2xl">
                    Prep these now to spend more time on your adventures and less in the galley!
                  </p>
                </div>
                
                <div className="grid gap-10">
                  {plan.weekendPrep.map((group, i) => (
                    <div key={i} className="bg-white p-10 rounded-[40px] border-4 border-green-50 shadow-2xl relative group hover:border-green-200 transition-all">
                      <div className="absolute -top-6 -left-6 w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl border-4 border-white">
                        {i + 1}
                      </div>
                      <h4 className="text-2xl font-black text-blue-950 mb-8 pl-6">{group.title}</h4>
                      <ul className="space-y-5">
                        {group.tasks.map((task, j) => (
                          <li key={j} className="flex gap-5 text-slate-700 items-start group/item">
                            <div className="mt-1 w-7 h-7 rounded-xl border-4 border-blue-50 flex-shrink-0 group-hover/item:border-blue-600 transition-all"></div>
                            <span className="font-bold text-lg">{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center pt-16">
                  <button 
                    onClick={() => { setStep('selection'); setPlan(null); }}
                    className="bg-white px-12 py-5 rounded-full border-4 border-blue-100 text-blue-900 font-black text-xl hover:bg-blue-50 transition-all shadow-2xl hover:-translate-y-2 active:translate-y-0"
                  >
                    RETURN TO PORT & RESET ⚓
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
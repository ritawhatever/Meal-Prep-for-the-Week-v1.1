import React, { useState } from 'react';
import { PROTEIN_GROUPS, VEGGIE_GROUPS, CARB_GROUPS, VEGGIES, CARBS, MAX_PROTEINS, MAX_VEGGIES, MAX_CARBS } from './constants';
import { SelectionState, WeeklyPlan, Recipe } from './types';
import { generateMealPlan } from './services/geminiService';
import { IngredientSelector } from './components/IngredientSelector';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';

const CaptainBlackCat = ({ className = "" }: { className?: string }) => (
  <div className={`relative w-20 h-20 flex-shrink-0 drop-shadow-xl ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path fill="#0f172a" d="M25 85 Q50 95 75 85 L75 45 Q75 25 55 25 L45 25 Q25 25 25 45 Z" />
      <path fill="#0f172a" d="M25 45 L15 15 L40 30 Z" />
      <path fill="#0f172a" d="M75 45 L85 15 L60 30 Z" />
      <circle cx="40" cy="50" r="4" fill="white" />
      <circle cx="60" cy="50" r="4" fill="white" />
      <circle cx="40" cy="50" r="1.5" fill="#000" />
      <circle cx="60" cy="50" r="1.5" fill="#000" />
      {/* Captain's Hat */}
      <path fill="#1e3a8a" d="M15 35 Q50 15 85 35 L90 40 Q50 55 10 40 Z" />
      <path fill="white" d="M20 34 Q50 18 80 34 L82 38 Q50 48 18 38 Z" />
      <circle cx="50" cy="28" r="4" fill="#fbbf24" stroke="#1e3a8a" strokeWidth="1" />
      <path fill="#1e3a8a" d="M48 26 L52 26 L50 32 Z" />
    </svg>
  </div>
);

const AssistantOrangeCat = ({ className = "" }: { className?: string }) => (
  <div className={`relative w-20 h-20 flex-shrink-0 drop-shadow-xl ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path fill="#f97316" d="M25 85 Q50 95 75 85 L75 45 Q75 25 55 25 L45 25 Q25 25 25 45 Z" />
      <path fill="#f97316" d="M25 45 L15 15 L40 30 Z" />
      <path fill="#f97316" d="M75 45 L85 15 L60 30 Z" />
      <circle cx="40" cy="50" r="4" fill="white" />
      <circle cx="60" cy="50" r="4" fill="white" />
      <circle cx="40" cy="50" r="1.5" fill="#000" />
      <circle cx="60" cy="50" r="1.5" fill="#000" />
      {/* Opera Glass Accessory */}
      <g className="animate-peer origin-[40px_50px]" transform="translate(35, 45)">
        <rect x="-2" y="10" width="2" height="20" fill="#78350f" rx="1" />
        <rect x="0" y="0" width="30" height="4" fill="#d97706" rx="1" />
        <g transform="translate(0, -4)">
          <rect x="2" y="0" width="10" height="12" fill="#b45309" stroke="#fbbf24" strokeWidth="1" rx="2" />
          <circle cx="7" cy="6" r="3" fill="#bae6fd" opacity="0.6" />
          <rect x="18" y="0" width="10" height="12" fill="#b45309" stroke="#fbbf24" strokeWidth="1" rx="2" />
          <circle cx="23" cy="6" r="3" fill="#bae6fd" opacity="0.6" />
        </g>
      </g>
    </svg>
  </div>
);

const HeaderCats = ({ onClick }: { onClick: () => void }) => (
  <div 
    className="flex items-center gap-2 cursor-pointer group select-none relative" 
    onClick={onClick}
    aria-label="Return to Port"
  >
    <div className="flex -space-x-10 group-hover:space-x-1 transition-all duration-700 animate-cat-header">
      <CaptainBlackCat className="scale-75 sm:scale-90 z-20" />
      <AssistantOrangeCat className="scale-75 sm:scale-90 z-10" />
    </div>
    <div className="hidden lg:block ml-4">
      <h1 className="text-2xl font-black text-white tracking-tighter leading-none italic uppercase">The Captains' Table</h1>
      <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mt-1">Andrea & Rita's Musical Galley</p>
    </div>
  </div>
);

const MusicalShipLogo = ({ className = "" }: { className?: string }) => (
  <div className={`relative w-64 h-64 flex items-center justify-center ${className}`}>
    <div className="absolute inset-0 bg-blue-200 rounded-full scale-125 opacity-10 animate-pulse"></div>
    <svg viewBox="0 0 200 200" className="w-full h-full animate-ship">
      <path fill="#1e3a8a" d="M20 130 Q100 170 180 130 L170 100 L30 100 Z" />
      <path fill="#172554" d="M30 100 L170 100 L165 110 L35 110 Z" />
      <rect x="95" y="30" width="10" height="80" fill="#78350f" />
      <path fill="#ffffff" d="M105 40 Q150 65 105 90 Z" opacity="0.95" stroke="#e2e8f0" strokeWidth="1" />
      <g transform="translate(35, 75) scale(0.45)">
        <CaptainBlackCat />
      </g>
      <g transform="translate(105, 75) scale(0.45)">
        <AssistantOrangeCat />
      </g>
      <g className="text-blue-400">
        <text x="15" y="50" fontSize="18" className="animate-float">♪</text>
        <text x="175" y="60" fontSize="18" className="animate-float" style={{ animationDelay: '1.2s' }}>🔭</text>
      </g>
    </svg>
  </div>
);

const App: React.FC = () => {
  const [step, setStep] = useState<'selection' | 'generating' | 'results'>('selection');
  const [selection, setSelection] = useState<SelectionState>({ proteins: [], veggies: [], carbs: [] });
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'weekly' | 'weekend'>('weekly');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const toggleSelection = (category: keyof SelectionState, item: string) => {
    setSelection(prev => {
      const current = prev[category];
      const max = category === 'proteins' ? MAX_PROTEINS : category === 'veggies' ? MAX_VEGGIES : MAX_CARBS;
      if (current.includes(item)) return { ...prev, [category]: current.filter(i => i !== item) };
      if (current.length < max) return { ...prev, [category]: [...current, item] };
      return prev;
    });
  };

  const handleGenerate = async () => {
    if (selection.proteins.length < MAX_PROTEINS) {
      setError(`Captains, the crew requires ${MAX_PROTEINS} proteins for the voyage!`);
      return;
    }
    setStep('generating');
    setError(null);
    try {
      const result = await generateMealPlan(selection.proteins, selection.veggies, selection.carbs);
      setPlan(result);
      setStep('results');
    } catch (e: any) {
      setError(`Voyage Interrupted: ${e.message || 'Storm in the Galley'}`);
      setStep('selection');
    }
  };

  return (
    <div className="pb-24">
      <header className="bg-blue-900 border-b-8 border-blue-950 sticky top-0 z-50 h-28 shadow-2xl flex items-center px-8">
        <HeaderCats onClick={() => setStep('selection')} />
        
        <div className="flex-1"></div>

        {step === 'results' && (
          <div className="bg-blue-950/50 p-1.5 rounded-3xl flex gap-1.5 border-2 border-blue-800 shadow-inner">
            <button onClick={() => setActiveTab('weekly')} className={`px-6 py-2.5 text-xs font-black rounded-2xl transition-all ${activeTab === 'weekly' ? 'bg-blue-500 text-white shadow-xl' : 'text-blue-400'}`}>THE VOYAGE</button>
            <button onClick={() => setActiveTab('weekend')} className={`px-6 py-2.5 text-xs font-black rounded-2xl transition-all ${activeTab === 'weekend' ? 'bg-sky-500 text-white shadow-xl' : 'text-sky-400'}`}>DOCKING PREP</button>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-8 pt-16">
        {step === 'selection' && (
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="text-center mb-20 relative">
              <div className="inline-flex items-center justify-center mb-8">
                <MusicalShipLogo />
              </div>
              <h2 className="text-7xl font-black text-blue-950 italic mb-6 leading-tight uppercase">Secure the Cargo</h2>
              <p className="text-blue-800 font-bold text-xl max-w-2xl mx-auto opacity-80">Captains Andrea & Rita, scout your provisions for the week ahead.</p>
            </div>

            {error && (
              <div className="max-w-xl mx-auto mb-16 p-8 bg-red-50 border-l-[12px] border-red-600 text-red-950 rounded-3xl flex items-center gap-6 shadow-2xl">
                <span className="text-4xl animate-bounce">⚓</span>
                <span className="font-black italic text-lg">{error}</span>
              </div>
            )}

            <div className="space-y-12">
              <IngredientSelector title="🛳️ Main Provisions" options={PROTEIN_GROUPS} selected={selection.proteins} max={MAX_PROTEINS} onToggle={(i) => toggleSelection('proteins', i)} />
              <IngredientSelector title="🌿 Garden Island" options={VEGGIE_GROUPS} selected={selection.veggies} max={MAX_VEGGIES} onToggle={(i) => toggleSelection('veggies', i)} onAutoFill={() => setSelection(p => ({ ...p, veggies: [...p.veggies, ...VEGGIES.filter(v => !p.veggies.includes(v)).sort(() => 0.5 - Math.random()).slice(0, MAX_VEGGIES - p.veggies.length)] }))} />
              <IngredientSelector title="🌾 Merchant Carbs" options={CARB_GROUPS} selected={selection.carbs} max={MAX_CARBS} onToggle={(i) => toggleSelection('carbs', i)} onAutoFill={() => setSelection(p => ({ ...p, carbs: [...p.carbs, ...CARBS.filter(c => !p.carbs.includes(c)).sort(() => 0.5 - Math.random()).slice(0, MAX_CARBS - p.carbs.length)] }))} />
            </div>

            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-lg px-8 z-40">
              <button onClick={handleGenerate} className={`w-full py-8 rounded-[45px] font-black text-3xl shadow-3xl transition-all duration-300 transform border-b-[10px] active:translate-y-3 active:border-b-0 ${selection.proteins.length === MAX_PROTEINS ? 'bg-blue-800 text-white border-blue-950 hover:-translate-y-3 shadow-blue-900/50' : 'bg-slate-300 text-slate-500 border-slate-400 cursor-not-allowed opacity-40'}`}>
                {selection.proteins.length === MAX_PROTEINS ? 'SET SAIL! ⚓' : `SELECT ${MAX_PROTEINS - selection.proteins.length} PROTEINS`}
              </button>
            </div>
          </div>
        )}

        {step === 'generating' && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] relative overflow-hidden">
            <div className="relative z-10 text-center space-y-12">
              <MusicalShipLogo className="scale-125" />
              <div className="space-y-4">
                <h2 className="text-5xl font-black text-blue-950 italic tracking-tight uppercase">Scouting the Horizon</h2>
                <p className="text-blue-700 font-bold uppercase tracking-[0.5em] text-xs">Captains, provisions are being processed by the galley AI!</p>
              </div>
            </div>
          </div>
        )}

        {step === 'results' && plan && (
          <div className="animate-in fade-in zoom-in-95 duration-1000">
            {activeTab === 'weekly' ? (
              <div className="space-y-32 pb-48">
                {plan.meals.map((dayPlan) => (
                  <section key={dayPlan.day}>
                    <div className="flex items-center gap-8 mb-16">
                      <div className="bg-blue-900 text-white px-12 py-5 rounded-[35px] font-black text-3xl italic shadow-2xl -rotate-2 border-4 border-blue-700 uppercase">
                        {dayPlan.day}
                      </div>
                      <div className="h-2 flex-1 bg-blue-200/50 rounded-full shadow-inner"></div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-16">
                      <RecipeCard type="Lunch" recipe={dayPlan.lunch} onOpen={() => setSelectedRecipe(dayPlan.lunch)} />
                      <RecipeCard type="Dinner" recipe={dayPlan.dinner} onOpen={() => setSelectedRecipe(dayPlan.dinner)} />
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="max-w-5xl mx-auto pb-48 space-y-16">
                <div className="bg-blue-900 text-white p-16 rounded-[70px] shadow-3xl relative overflow-hidden border-8 border-blue-800">
                  <h2 className="text-6xl font-black italic mb-6 uppercase">Docking Prep</h2>
                  <p className="text-blue-100 text-2xl font-bold opacity-80 leading-relaxed">Captains, prepare the galley on Sunday to enjoy a smooth sailing week!</p>
                </div>
                {plan.weekendPrep.map((group, i) => (
                  <div key={i} className="bg-white p-12 rounded-[55px] border-8 border-blue-50 shadow-3xl">
                    <h4 className="text-3xl font-black text-blue-950 flex items-center gap-6 mb-10">
                      <span className="w-14 h-14 bg-blue-800 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">{i+1}</span>
                      {group.title}
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-8">
                      {group.tasks.map((task, j) => (
                        <li key={j} className="flex gap-5 items-start text-slate-700 font-black text-lg">
                          <div className="w-8 h-8 rounded-xl border-4 border-blue-100 mt-1 flex-shrink-0" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="flex justify-center pt-20">
                  <button onClick={() => setStep('selection')} className="bg-white border-8 border-blue-100 px-16 py-6 rounded-full text-blue-950 font-black text-2xl hover:bg-blue-50 shadow-3xl transition-all">RETURN TO PORT ⚓</button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
    </div>
  );
};

export default App;
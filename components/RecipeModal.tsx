import React from 'react';
import { Recipe } from '../types';

interface Props {
  recipe: Recipe;
  onClose: () => void;
}

export const RecipeModal: React.FC<Props> = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-[50px] overflow-hidden flex flex-col shadow-3xl border-8 border-white animate-in zoom-in duration-300">
        <div className="p-8 border-b-4 border-blue-50 flex justify-between items-center bg-blue-50/30">
          <div>
            <h2 className="text-4xl font-black text-blue-950 italic">{recipe.name}</h2>
            <div className="flex gap-6 mt-2 text-sm text-blue-600 font-black uppercase tracking-widest">
              <span>⚓ {recipe.origin}</span>
              <span>⏱️ {recipe.timeMinutes} MINS</span>
              <span>👥 CAPTAINS' SERVING (2)</span>
            </div>
          </div>
          <button onClick={onClose} className="w-14 h-14 bg-white shadow-lg rounded-full flex items-center justify-center text-blue-900 hover:text-red-500 transition-colors border-2 border-blue-50">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-12 space-y-16">
          <div className="grid md:grid-cols-2 gap-12">
            <section className="bg-green-50/50 p-8 rounded-[40px] border-2 border-green-100">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-green-800 italic">
                Provisions Needed
              </h3>
              <ul className="space-y-4">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex justify-between items-center py-2 border-b border-green-100/50 text-slate-800">
                    <span className="font-bold">{ing.name}</span>
                    <span className="font-black text-green-700 bg-white px-3 py-1 rounded-lg text-sm">{ing.amount}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            <section className="bg-blue-50/50 p-8 rounded-[40px] border-2 border-blue-100">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-blue-800 italic">
                Exotic Spices
              </h3>
              <ul className="space-y-4">
                {recipe.spices.map((spice, i) => (
                  <li key={i} className="flex justify-between items-center py-2 border-b border-blue-100/50 text-slate-800">
                    <span className="font-bold">{spice.name}</span>
                    <span className="font-black text-blue-700 bg-white px-3 py-1 rounded-lg text-sm">{spice.amount}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section>
            <h3 className="text-2xl font-black mb-8 text-blue-950 italic flex items-center gap-3">
               Mise En Place (Prep Station)
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {recipe.miseEnPlace.map((step, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100 group hover:border-blue-200 transition-colors">
                  <h4 className="font-black text-xs uppercase text-blue-400 mb-2 tracking-widest">{step.title}</h4>
                  <p className="text-slate-800 font-medium leading-relaxed">{step.instruction}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-black mb-8 text-blue-950 italic">The Cooking Expedition</h3>
            <div className="space-y-6">
              {recipe.cookingSteps.map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-black text-xl shadow-lg group-hover:bg-green-600 transition-colors">
                    {i + 1}
                  </span>
                  <p className="text-slate-700 font-bold text-lg leading-relaxed pt-2">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-green-600 to-blue-700 rounded-[40px] p-10 text-white shadow-2xl">
            <h3 className="text-2xl font-black mb-6 italic">Navigator's Tips</h3>
            <ul className="space-y-4">
              {recipe.proTips.map((tip, i) => (
                <li key={i} className="flex gap-4 items-start font-bold">
                  <span className="text-green-300 text-2xl">★</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="p-10 bg-blue-50/50 border-t-4 border-blue-100 flex flex-col sm:flex-row gap-6 items-center justify-between">
          <a 
            href={recipe.searchUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white px-10 py-4 rounded-2xl text-blue-700 font-black text-lg hover:shadow-xl transition-all border-2 border-blue-200 flex items-center gap-3"
          >
            🔎 VIEW MAP (GOOGLE)
          </a>
          <p className="text-blue-400 font-black italic">Fair Winds and Full Bellies, Captains!</p>
        </div>
      </div>
    </div>
  );
};
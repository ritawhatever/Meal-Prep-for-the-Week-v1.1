import React from 'react';
import { Recipe } from '../types';

interface Props {
  recipe: Recipe;
  onClose: () => void;
}

export const RecipeModal: React.FC<Props> = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-xl">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-[60px] overflow-hidden flex flex-col shadow-3xl border-[12px] border-blue-50 animate-in zoom-in duration-300">
        {/* Modal Header */}
        <div className="p-10 border-b-4 border-blue-50 flex justify-between items-center bg-blue-50/20">
          <div>
            <h2 className="text-5xl font-black text-blue-950 italic">{recipe.name}</h2>
            <div className="flex gap-8 mt-3 text-xs text-blue-600 font-black uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2">⚓ {recipe.origin}</span>
              <span className="flex items-center gap-2">⏱️ {recipe.timeMinutes} MINS</span>
              <span className="flex items-center gap-2">👨‍👩‍👦 SERVES 2 CAPTAINS</span>
            </div>
          </div>
          <button onClick={onClose} className="w-16 h-16 bg-white shadow-xl rounded-[24px] flex items-center justify-center text-blue-900 hover:text-red-500 transition-all border-4 border-blue-50 hover:-rotate-12 active:scale-90">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-12 space-y-16">
          <div className="grid md:grid-cols-2 gap-12">
            <section className="bg-blue-50/40 p-10 rounded-[45px] border-2 border-blue-100 relative overflow-hidden">
               <div className="absolute -bottom-4 -right-4 opacity-10 rotate-12">
                 <svg className="w-24 h-24 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l.642.058 4.493 4.493L22 12l-.058.642-4.493 4.493L12 22l-.642-.058-4.493-4.493L2 12l.058-.642 4.493-4.493L12 2z"/></svg>
               </div>
              <h3 className="text-2xl font-black mb-8 text-blue-900 italic">Voyage Supplies</h3>
              <ul className="space-y-5">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex justify-between items-center text-slate-800 font-bold border-b border-blue-100/50 pb-2">
                    <span>{ing.name}</span>
                    <span className="bg-white px-4 py-1.5 rounded-xl text-blue-700 text-sm shadow-sm">{ing.amount}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            <section className="bg-sky-50/40 p-10 rounded-[45px] border-2 border-sky-100">
              <h3 className="text-2xl font-black mb-8 text-sky-900 italic">Treasure Spices</h3>
              <ul className="space-y-5">
                {recipe.spices.map((spice, i) => (
                  <li key={i} className="flex justify-between items-center text-slate-800 font-bold border-b border-sky-100/50 pb-2">
                    <span>{spice.name}</span>
                    <span className="bg-white px-4 py-1.5 rounded-xl text-sky-700 text-sm shadow-sm">{spice.amount}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section>
            <h3 className="text-3xl font-black mb-10 text-blue-950 italic">Navigational Prep</h3>
            <div className="grid sm:grid-cols-2 gap-8">
              {recipe.miseEnPlace.map((step, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-[35px] border-4 border-slate-100 hover:border-blue-200 transition-colors">
                  <h4 className="font-black text-[10px] uppercase text-blue-500 mb-3 tracking-[0.2em]">{step.title}</h4>
                  <p className="text-slate-800 font-bold leading-relaxed">{step.instruction}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-3xl font-black mb-10 text-blue-950 italic">The Culinary Expedition</h3>
            <div className="space-y-8">
              {recipe.cookingSteps.map((step, i) => (
                <div key={i} className="flex gap-8 group">
                  <span className="flex-shrink-0 w-14 h-14 rounded-[22px] bg-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all">
                    {i + 1}
                  </span>
                  <p className="text-slate-700 font-bold text-xl leading-relaxed pt-2">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-blue-600 to-sky-700 rounded-[50px] p-12 text-white shadow-3xl">
            <h3 className="text-3xl font-black mb-8 italic">Captain's Secrets</h3>
            <ul className="space-y-6">
              {recipe.proTips.map((tip, i) => (
                <li key={i} className="flex gap-6 items-start font-black text-lg">
                  <span className="text-sky-300 text-3xl">⚓</span>
                  <span className="leading-relaxed opacity-95">{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-10 bg-blue-50/30 border-t-4 border-blue-50 flex flex-col sm:flex-row gap-8 items-center justify-between">
          <a 
            href={recipe.searchUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white px-12 py-5 rounded-[25px] text-blue-700 font-black text-xl hover:shadow-2xl transition-all border-4 border-blue-100 flex items-center gap-4 group"
          >
            🗺️ VIEW SEA MAP
            <svg className="w-6 h-6 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
          <p className="text-blue-400 font-black italic text-lg">Smooth sailing, Andrea & Rita!</p>
        </div>
      </div>
    </div>
  );
};
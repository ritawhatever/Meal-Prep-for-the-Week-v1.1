
import React from 'react';
import { Recipe } from '../types';

interface Props {
  recipe: Recipe;
  onClose: () => void;
}

export const RecipeModal: React.FC<Props> = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-height-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-indigo-50/30">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{recipe.name}</h2>
            <div className="flex gap-4 mt-1 text-sm text-slate-600 font-medium">
              <span>🌍 {recipe.origin}</span>
              <span>⏱️ {recipe.timeMinutes} mins</span>
              <span>👥 Serves 2</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-slate-400 hover:text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {/* Ingredients & Spices */}
          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                Ingredients
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex justify-between py-1 border-b border-slate-50 text-slate-700">
                    <span>{ing.name}</span>
                    <span className="font-semibold text-slate-900">{ing.amount}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
                Spices
              </h3>
              <ul className="space-y-2">
                {recipe.spices.map((spice, i) => (
                  <li key={i} className="flex justify-between py-1 border-b border-slate-50 text-slate-700">
                    <span>{spice.name}</span>
                    <span className="font-semibold text-slate-900">{spice.amount}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Mise En Place */}
          <section>
            <h3 className="text-lg font-bold mb-4 text-slate-800">Mise En Place (Beginner Friendly)</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {recipe.miseEnPlace.map((step, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-sm uppercase text-slate-500 mb-1">{step.title}</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">{step.instruction}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Cooking Steps */}
          <section>
            <h3 className="text-lg font-bold mb-4 text-slate-800">Step-by-Step Cooking</h3>
            <div className="space-y-4">
              {recipe.cookingSteps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-slate-700 leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pro Tips */}
          <section className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
            <h3 className="text-lg font-bold mb-3 text-amber-800">Pro Tips</h3>
            <ul className="list-disc list-inside space-y-2 text-amber-900">
              {recipe.proTips.map((tip, i) => (
                <li key={i} className="text-sm italic">{tip}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <a 
            href={recipe.searchUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-2 text-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            Search dish on Google
          </a>
          {recipe.isFreezable && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              Freezer Friendly
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

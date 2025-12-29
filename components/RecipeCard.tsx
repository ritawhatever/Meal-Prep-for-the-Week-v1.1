import React from 'react';
import { Recipe } from '../types';

interface Props {
  type: 'Lunch' | 'Dinner';
  recipe: Recipe;
  onOpen: () => void;
}

export const RecipeCard: React.FC<Props> = ({ type, recipe, onOpen }) => {
  return (
    <div className="bg-white rounded-[65px] p-12 shadow-3xl shadow-blue-900/10 border-8 border-blue-50 hover:border-blue-800 transition-all group relative flex flex-col h-full hover:-translate-y-4 duration-500">
      <div className={`absolute top-0 right-0 w-56 h-56 -mr-28 -mt-28 rounded-full opacity-5 group-hover:opacity-15 transition-opacity duration-700 ${
        type === 'Lunch' ? 'bg-sky-500' : 'bg-blue-900'
      }`}></div>

      <div className="relative flex-1">
        <div className="flex justify-between items-start mb-10">
          <span className={`text-[11px] font-black uppercase tracking-[0.5em] px-8 py-3 rounded-2xl shadow-md ${
            type === 'Lunch' ? 'bg-sky-900 text-sky-50' : 'bg-blue-900 text-blue-50'
          }`}>
            {type === 'Lunch' ? 'PORTSIDE LUNCH' : 'MID-OCEAN DINNER'}
          </span>
          {recipe.isFreezable && (
            <div className="bg-blue-50 text-blue-800 p-3 rounded-2xl border-2 border-blue-100 shadow-sm" title="Freeze-Proof Cargo">
               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l.642.058 4.493 4.493L22 12l-.058.642-4.493 4.493L12 22l-.642-.058-4.493-4.493L2 12l.058-.642 4.493-4.493L12 2z"/></svg>
            </div>
          )}
        </div>
        
        <h4 className="text-5xl font-black text-blue-950 group-hover:text-blue-800 transition-colors leading-tight mb-6 italic">
          {recipe.name}
        </h4>
        <div className="flex gap-4">
            <p className="text-sm font-black text-blue-700 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">{recipe.origin}</p>
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest px-4 py-2 border-2 border-slate-50 rounded-xl">{recipe.timeMinutes} MINS</p>
        </div>
      </div>
      
      <button 
        onClick={onOpen}
        className="mt-14 w-full py-7 px-10 bg-blue-800 text-white rounded-[35px] text-xl font-black hover:bg-blue-950 transition-all flex items-center justify-center gap-6 shadow-2xl shadow-blue-900/40 active:scale-95 active:translate-y-2"
      >
        EXAMINE LOGBOOK
        <svg className="w-8 h-8 group-hover:translate-x-3 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
};
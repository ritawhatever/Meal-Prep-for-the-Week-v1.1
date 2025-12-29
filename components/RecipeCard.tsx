import React from 'react';
import { Recipe } from '../types';

interface Props {
  type: 'Lunch' | 'Dinner';
  recipe: Recipe;
  onOpen: () => void;
}

export const RecipeCard: React.FC<Props> = ({ type, recipe, onOpen }) => {
  return (
    <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-blue-900/10 border-4 border-blue-50 hover:border-blue-600 transition-all group relative overflow-hidden flex flex-col h-full">
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-10 ${
        type === 'Lunch' ? 'bg-green-500' : 'bg-blue-800'
      }`}></div>

      <div className="relative flex-1">
        <div className="flex justify-between items-start mb-6">
          <span className={`text-[11px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-2xl shadow-sm ${
            type === 'Lunch' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {type === 'Lunch' ? 'Portside Lunch' : 'Deep Sea Dinner'}
          </span>
          {recipe.isFreezable && (
            <div className="bg-blue-50 text-blue-600 p-2 rounded-xl" title="Safe for the Hull Freezer">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
          )}
        </div>
        
        <h4 className="text-3xl font-black text-blue-950 group-hover:text-blue-700 transition-colors leading-tight mb-3">
          {recipe.name}
        </h4>
        <p className="text-sm font-black text-green-600 uppercase tracking-widest">{recipe.origin} • {recipe.timeMinutes} MINS</p>
      </div>
      
      <button 
        onClick={onOpen}
        className="mt-10 w-full py-5 px-8 bg-blue-700 text-white rounded-[24px] text-lg font-black hover:bg-blue-800 transition-all flex items-center justify-center gap-4 shadow-xl shadow-blue-900/20 active:scale-95"
      >
        OPEN LOGBOOK
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
};
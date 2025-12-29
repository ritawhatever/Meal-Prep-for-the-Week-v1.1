
import React from 'react';
import { Recipe } from '../types';

interface Props {
  type: 'Lunch' | 'Dinner';
  recipe: Recipe;
  onOpen: () => void;
}

export const RecipeCard: React.FC<Props> = ({ type, recipe, onOpen }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
            type === 'Lunch' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {type}
          </span>
          <h4 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {recipe.name}
          </h4>
          <p className="text-sm text-slate-500">{recipe.origin} • {recipe.timeMinutes} mins</p>
        </div>
        <div className="flex gap-2">
          <a 
            href={recipe.searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-600 p-1.5 rounded-lg hover:bg-indigo-50 transition-all"
            title="Search recipe on Google"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </a>
          {recipe.isFreezable && (
            <span className="bg-cyan-50 text-cyan-700 p-1.5 rounded-lg" title="Freezer Friendly">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
          )}
        </div>
      </div>
      
      <button 
        onClick={onOpen}
        className="w-full py-2.5 px-4 bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
      >
        View Full Recipe
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
};

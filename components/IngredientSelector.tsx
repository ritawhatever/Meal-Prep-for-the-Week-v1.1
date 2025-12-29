
import React from 'react';

export interface OptionGroup {
  label: string;
  items: string[];
}

interface Props {
  title: string;
  options: string[] | OptionGroup[];
  selected: string[];
  max: number;
  onToggle: (item: string) => void;
  onAutoFill?: () => void;
}

export const IngredientSelector: React.FC<Props> = ({ title, options, selected, max, onToggle, onAutoFill }) => {
  const isGrouped = options.length > 0 && typeof options[0] !== 'string';

  const renderButton = (item: string) => {
    const isSelected = selected.includes(item);
    const isDisabled = !isSelected && selected.length >= max;
    
    return (
      <button
        key={item}
        onClick={() => onToggle(item)}
        disabled={isDisabled}
        className={`
          px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-2 text-left relative overflow-hidden
          ${isSelected 
            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md transform scale-[1.02]' 
            : isDisabled 
              ? 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed opacity-50'
              : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/30 shadow-sm'
          }
        `}
      >
        {isSelected && (
          <div className="absolute top-1 right-1">
            <svg className="w-3 h-3 text-indigo-200" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        {item}
      </button>
    );
  };

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">Choose up to {max} items</p>
        </div>
        <div className="flex items-center gap-3">
          {onAutoFill && selected.length < max && (
            <button
              onClick={onAutoFill}
              className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Auto-fill remaining
            </button>
          )}
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
            selected.length === max ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-slate-100 text-slate-500 border border-slate-200'
          }`}>
            {selected.length} / {max}
          </span>
        </div>
      </div>

      {isGrouped ? (
        <div className="space-y-8">
          {(options as OptionGroup[]).map((group) => (
            <div key={group.label}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 ml-1">{group.label}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {group.items.map(renderButton)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {(options as string[]).map(renderButton)}
        </div>
      )}
    </div>
  );
};

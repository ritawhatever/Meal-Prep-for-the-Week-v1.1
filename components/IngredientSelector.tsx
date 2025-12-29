
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
          px-4 py-4 rounded-2xl text-sm font-bold transition-all duration-300 border-2 text-left relative overflow-hidden h-full flex items-center justify-between
          ${isSelected 
            ? 'bg-blue-900 border-blue-900 text-white shadow-xl transform scale-[1.05] z-10' 
            : isDisabled 
              ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed opacity-40'
              : 'bg-white border-blue-50 text-blue-900 hover:border-blue-400 hover:bg-blue-50/50 shadow-sm'
          }
        `}
      >
        <span className="relative z-10">{item}</span>
        {isSelected && (
          <div className="relative z-10">
            <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="mb-16 bg-white/40 p-8 rounded-[40px] border border-blue-50 shadow-inner">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-black text-blue-950 italic">{title}</h3>
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mt-1">Captain's Quota: {max} Items</p>
        </div>
        <div className="flex items-center gap-3">
          {onAutoFill && selected.length < max && (
            <button
              onClick={onAutoFill}
              className="text-xs font-black text-blue-900 bg-blue-100 px-4 py-2 rounded-full hover:bg-blue-200 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              QUICK STOW
            </button>
          )}
          <div className={`text-xs font-black px-4 py-2 rounded-full border-2 ${
            selected.length === max ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-blue-900 border-blue-100'
          }`}>
            {selected.length} / {max}
          </div>
        </div>
      </div>

      {isGrouped ? (
        <div className="space-y-12">
          {(options as OptionGroup[]).map((group) => (
            <div key={group.label}>
              <div className="flex items-center gap-3 mb-4 ml-1">
                <div className="w-2 h-2 rounded-full bg-blue-900"></div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">{group.label}</h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {group.items.map(renderButton)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {(options as string[]).map(renderButton)}
        </div>
      )}
    </div>
  );
};

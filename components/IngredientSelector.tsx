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
          px-6 py-6 rounded-[35px] text-base font-black transition-all duration-500 border-4 text-left relative overflow-hidden h-full flex items-center justify-between group
          ${isSelected 
            ? 'bg-blue-900 border-blue-950 text-white shadow-3xl transform scale-105 z-10' 
            : isDisabled 
              ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed opacity-20 scale-95'
              : 'bg-white border-blue-50 text-blue-950 hover:border-blue-600 hover:bg-blue-50/50 hover:-translate-y-2 shadow-xl'
          }
        `}
      >
        <span className="relative z-10 group-hover:tracking-wider transition-all duration-500">{item}</span>
        {isSelected && (
          <div className="relative z-10 bg-white/20 p-2 rounded-2xl">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="mb-16 bg-white/40 p-12 rounded-[65px] border-8 border-blue-50 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 mb-12">
        <div>
          <h3 className="text-4xl font-black text-blue-950 italic tracking-tight">{title}</h3>
          <p className="text-[12px] font-black text-blue-600 uppercase tracking-[0.4em] mt-3">CAPTAIN'S QUOTA: {max} ITEMS</p>
        </div>
        <div className="flex items-center gap-6">
          {onAutoFill && selected.length < max && (
            <button
              onClick={onAutoFill}
              className="text-sm font-black text-blue-950 bg-blue-100/80 px-7 py-4 rounded-2xl hover:bg-blue-200 transition-all flex items-center gap-4 border-2 border-blue-200 group active:scale-95"
            >
              <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              FAST STOW
            </button>
          )}
          <div className={`text-lg font-black px-8 py-4 rounded-3xl border-4 transition-all duration-700 ${
            selected.length === max ? 'bg-blue-900 text-white border-blue-950 shadow-2xl' : 'bg-white text-blue-950 border-blue-100 shadow-inner'
          }`}>
            {selected.length} / {max}
          </div>
        </div>
      </div>

      {isGrouped ? (
        <div className="space-y-16">
          {(options as OptionGroup[]).map((group) => (
            <div key={group.label}>
              <div className="flex items-center gap-4 mb-8 ml-3">
                <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
                <h4 className="text-[13px] font-black uppercase tracking-[0.5em] text-blue-400">{group.label}</h4>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {group.items.map(renderButton)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {(options as string[]).map(renderButton)}
        </div>
      )}
    </div>
  );
};
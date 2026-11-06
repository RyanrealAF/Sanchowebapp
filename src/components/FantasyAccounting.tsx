import React, { useState } from 'react';
import { Scale, Check, Plus, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { INITIAL_LEDGER_ITEMS, LedgerEntry } from '../utils/companionData';
import { calculateEmotionalOverhead } from '../utils/bookLogic';
import { soundscapes } from '../utils/ambientAudio';

export const FantasyAccounting: React.FC = () => {
  const [items, setItems] = useState<LedgerEntry[]>(INITIAL_LEDGER_ITEMS);
  const [customTitle, setCustomTitle] = useState('');
  const [customWeight, setCustomWeight] = useState(20);
  const [customCategory, setCustomCategory] = useState<'sancho' | 'daniel'>('daniel');

  const sanchoItems = items.filter(i => i.category === 'sancho');
  const danielItems = items.filter(i => i.category === 'daniel');

  const activeSanchoIds = sanchoItems.filter(i => i.active).map(i => i.id);
  const activeDanielIds = danielItems.filter(i => i.active).map(i => i.id);

  const overhead = calculateEmotionalOverhead(activeSanchoIds, activeDanielIds, items);

  const toggleItem = (id: string) => {
    soundscapes.playPageTurn();
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, active: !item.active } : item))
    );
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    soundscapes.playPageTurn();
    const newItem: LedgerEntry = {
      id: `custom-${Date.now()}`,
      title: customTitle.trim(),
      category: customCategory,
      costWeight: Number(customWeight),
      description: 'Reader-added domestic or boutique balance sheet entry.',
      iconName: customCategory === 'sancho' ? 'Sparkles' : 'Wrench',
      active: true,
    };

    setItems(prev => [...prev, newItem]);
    setCustomTitle('');
  };

  const handleReset = () => {
    setItems(INITIAL_LEDGER_ITEMS);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Title & Introduction */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-sans font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Chapter 13 Companion & Tasha Green’s Audit</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-medium text-stone-900 dark:text-stone-100 tracking-tight">
          Fantasy Accounting: The Relationship Ledger
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-reading-serif leading-relaxed">
          Sancho Blanco’s system permits the practitioner to systematically harvest the curated dividends of an illicit romance while offloading all unglamorous domestic maintenance onto the primary husband. Adjust the line items below to compute the hidden emotional subsidy.
        </p>
      </div>

      {/* The Scoreboard / Summary Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-sans font-semibold">
              The Real-Time Audit
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-stone-900 dark:text-stone-100">
              Domestic Subsidy Ratio: {overhead.subsidyRatio}x
            </h3>
          </div>

          <button
            onClick={handleReset}
            className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center gap-1 font-sans"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Default Ledger</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-1">
            <div className="text-xs uppercase font-sans font-semibold text-amber-800 dark:text-amber-400">
              Sancho’s Extraction Column (Zero Liability)
            </div>
            <div className="text-3xl font-display font-bold text-amber-950 dark:text-amber-200 tabular-nums">
              {overhead.sanchoTotal} <span className="text-xs font-sans font-normal text-stone-500">dividend points</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-reading-serif pt-1">
              Curated dinners, amber mood, witty conversations, and guaranteed punctual exits.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-100/80 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-1">
            <div className="text-xs uppercase font-sans font-semibold text-stone-700 dark:text-stone-300">
              Daniel’s Domestic Mortgage (Structural Utility)
            </div>
            <div className="text-3xl font-display font-bold text-stone-900 dark:text-stone-100 tabular-nums">
              {overhead.danielTotal} <span className="text-xs font-sans font-normal text-stone-500">load-bearing points</span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 font-reading-serif pt-1">
              Mortgage, broken plumbing at 2 AM, label makers, family chats, and unglamorous Tuesdays.
            </p>
          </div>
        </div>

        {/* Tasha's Dynamic Auditor Verdict */}
        <div className="p-5 rounded-xl bg-stone-900 text-stone-100 dark:bg-stone-950 border border-stone-800 space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider text-amber-400">
            <AlertCircle className="w-4 h-4" />
            <span>Auditor Note (Tasha Green):</span>
          </div>
          <p className="text-base sm:text-lg font-reading-serif italic text-stone-200 leading-relaxed">
            “{overhead.verdict}”
          </p>
        </div>
      </div>

      {/* Dual Column Interactive Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Sancho's Column */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-amber-800/30 dark:border-amber-500/30 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
            <div>
              <h4 className="font-display font-semibold text-xl text-stone-900 dark:text-stone-100">
                Sancho’s Ledger: Boutique Tourism
              </h4>
              <p className="text-xs sm:text-sm text-stone-500 font-sans">
                The highlights, curated lighting, and zero housekeeping liability
              </p>
            </div>
            <span className="text-sm font-sans font-bold text-amber-800 dark:text-amber-400 tabular-nums">
              {overhead.sanchoTotal} pts
            </span>
          </div>

          <div className="space-y-3">
            {sanchoItems.map(item => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 min-h-[56px] ${
                  item.active
                    ? 'bg-amber-50/70 border-amber-300 dark:bg-amber-950/30 dark:border-amber-800'
                    : 'bg-stone-50/50 border-stone-200 dark:bg-stone-800/40 dark:border-stone-800 opacity-60'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    item.active
                      ? 'bg-amber-800 text-white dark:bg-amber-500 dark:text-stone-950'
                      : 'border border-stone-300 dark:border-stone-600'
                  }`}
                >
                  {item.active && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-stone-900 dark:text-stone-100 font-sans">
                      {item.title}
                    </span>
                    <span className="text-sm font-bold text-amber-900 dark:text-amber-300 tabular-nums ml-2">
                      +{item.costWeight} pts
                    </span>
                  </div>
                  <p className="text-sm text-stone-700 dark:text-stone-300 font-reading-serif leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Daniel's Column */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
            <div>
              <h4 className="font-display font-semibold text-xl text-stone-900 dark:text-stone-100">
                Daniel’s Ledger: Domestic Mortgage
              </h4>
              <p className="text-xs sm:text-sm text-stone-500 font-sans">
                The load-bearing infrastructure, unglamorous labor, and history
              </p>
            </div>
            <span className="text-sm font-sans font-bold text-stone-900 dark:text-stone-100 tabular-nums">
              {overhead.danielTotal} pts
            </span>
          </div>

          <div className="space-y-3">
            {danielItems.map(item => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 min-h-[56px] ${
                  item.active
                    ? 'bg-stone-100 border-stone-400 dark:bg-stone-800 dark:border-stone-600'
                    : 'bg-stone-50/50 border-stone-200 dark:bg-stone-800/40 dark:border-stone-800 opacity-60'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    item.active
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950'
                      : 'border border-stone-300 dark:border-stone-600'
                  }`}
                >
                  {item.active && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-stone-900 dark:text-stone-100 font-sans">
                      {item.title}
                    </span>
                    <span className="text-sm font-bold text-stone-900 dark:text-stone-100 tabular-nums ml-2">
                      +{item.costWeight} pts
                    </span>
                  </div>
                  <p className="text-sm text-stone-700 dark:text-stone-300 font-reading-serif leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Custom Ledger Entry */}
      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <h4 className="text-xs sm:text-sm uppercase tracking-widest font-sans font-semibold text-stone-500">
          Add Custom Expense to Balance Sheet
        </h4>

        <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 w-full space-y-1">
            <label className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans font-medium">Expense Title / Action</label>
            <input
              type="text"
              value={customTitle}
              onChange={e => setCustomTitle(e.target.value)}
              placeholder="e.g. Broken water heater replacement on Thanksgiving..."
              className="w-full text-sm p-3 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-600 min-h-[44px]"
            />
          </div>

          <div className="w-full sm:w-44 space-y-1">
            <label className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans font-medium">Category</label>
            <select
              value={customCategory}
              onChange={e => setCustomCategory(e.target.value as 'sancho' | 'daniel')}
              className="w-full text-sm p-3 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 min-h-[44px]"
            >
              <option value="daniel">Daniel (Mortgage)</option>
              <option value="sancho">Sancho (Boutique)</option>
            </select>
          </div>

          <div className="w-full sm:w-32 space-y-1">
            <label className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans font-medium">Weight (Pts)</label>
            <input
              type="number"
              min="5"
              max="100"
              value={customWeight}
              onChange={e => setCustomWeight(Number(e.target.value))}
              className="w-full text-sm p-3 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 tabular-nums min-h-[44px]"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 text-sm font-medium hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shrink-0 min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>Add Entry</span>
          </button>
        </form>
      </div>
    </div>
  );
};

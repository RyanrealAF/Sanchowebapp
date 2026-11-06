import React, { useState } from 'react';
import { Compass, BookOpen, AlertCircle, Shield } from 'lucide-react';
import { BLANCO_LAWS, BlancoLaw } from '../utils/companionData';
import { soundscapes } from '../utils/ambientAudio';

interface BlancoCodeCodexProps {
  onJumpToNovellaChapter?: (chapterId: string) => void;
}

export const BlancoCodeCodex: React.FC<BlancoCodeCodexProps> = ({ onJumpToNovellaChapter }) => {
  const [selectedLawId, setSelectedLawId] = useState<string>(BLANCO_LAWS[0].id);

  const selectedLaw: BlancoLaw = BLANCO_LAWS.find(l => l.id === selectedLawId) || BLANCO_LAWS[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-sans font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>The Behavioral Constitution</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-medium text-stone-900 dark:text-stone-100 tracking-tight">
          The Blanco Code: The Seven Non-Negotiables
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-reading-serif max-w-3xl leading-relaxed">
          The operational standards designed to ensure that if an error in judgment occurs, it occurs with dignity, exceptional vocabulary, and zero collateral damage to the family group chat.
        </p>
      </div>

      {/* Main Grid: Law Tabs & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 7 Laws List */}
        <div className="lg:col-span-5 space-y-3">
          {BLANCO_LAWS.map(law => {
            const active = law.id === selectedLaw.id;
            return (
              <button
                key={law.id}
                onClick={() => {
                  soundscapes.playPageTurn();
                  setSelectedLawId(law.id);
                }}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all space-y-1.5 min-h-[64px] ${
                  active
                    ? 'bg-amber-950/10 border-amber-800 text-stone-900 dark:bg-amber-500/20 dark:border-amber-400 dark:text-stone-100 shadow-sm'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs sm:text-sm font-sans font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                  <span>{law.number}</span>
                  <span className="font-normal text-xs text-stone-400 truncate max-w-[150px]">
                    {law.associatedNovellaChapter.split(':')[0]}
                  </span>
                </div>
                <h3 className="text-lg font-display font-semibold text-stone-900 dark:text-stone-100">
                  {law.title}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 font-reading-serif leading-relaxed">
                  {law.mandate}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Column: Detailed Inspector Card */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
          <div className="border-b border-stone-200 dark:border-stone-800 pb-4 space-y-1">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-amber-800 dark:text-amber-400 font-sans font-bold">
              {selectedLaw.number} Analysis
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-stone-900 dark:text-stone-100">
              {selectedLaw.title}
            </h2>
          </div>

          {/* Primary Mandate Callout */}
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50 space-y-1.5">
            <div className="text-xs sm:text-sm uppercase tracking-wider text-amber-900 dark:text-amber-300 font-sans font-bold flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>The Operational Mandate</span>
            </div>
            <p className="text-lg sm:text-xl font-reading-serif italic text-stone-900 dark:text-stone-100 leading-relaxed">
              “{selectedLaw.mandate}”
            </p>
          </div>

          {/* Mechanics Grid */}
          <div className="space-y-5 text-base sm:text-lg font-reading-serif text-stone-800 dark:text-stone-200 leading-relaxed">
            <div className="space-y-1.5">
              <span className="text-xs sm:text-sm font-sans font-semibold text-stone-400 uppercase tracking-wider block">
                Theoretical Purpose
              </span>
              <p>{selectedLaw.theoreticalPurpose}</p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs sm:text-sm font-sans font-semibold text-stone-400 uppercase tracking-wider block">
                Operational Mechanism
              </span>
              <p>{selectedLaw.operationalMechanism}</p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs sm:text-sm font-sans font-semibold text-stone-400 uppercase tracking-wider block">
                Psychological Function
              </span>
              <p>{selectedLaw.psychologicalFunction}</p>
            </div>
          </div>

          {/* Tasha Green Critical Counterweight */}
          <div className="p-5 rounded-2xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Tasha Green’s Reality Audit:</span>
            </div>
            <p className="text-sm sm:text-base font-reading-serif italic text-stone-700 dark:text-stone-300 leading-relaxed">
              “{selectedLaw.tashaCritique}”
            </p>
          </div>

          {/* Novella Mapping Link */}
          <div className="pt-3 flex items-center justify-between text-sm text-stone-500 font-sans border-t border-stone-100 dark:border-stone-800">
            <span>Tested in: <strong>{selectedLaw.associatedNovellaChapter}</strong></span>
            {onJumpToNovellaChapter && (
              <button
                onClick={() => onJumpToNovellaChapter('b2-ch1')}
                className="text-amber-800 dark:text-amber-400 font-medium hover:underline flex items-center gap-1.5 min-h-[44px]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Jump to Story Chapter</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

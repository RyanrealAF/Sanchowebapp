import React, { useState } from 'react';
import { UserCheck, Sparkles, Shield, AlertTriangle } from 'lucide-react';
import { CHARACTER_PROFILES, CharacterProfile } from '../utils/companionData';
import { soundscapes } from '../utils/ambientAudio';

export const PathologyDossier: React.FC = () => {
  const [selectedCharId, setSelectedCharId] = useState<string>('sancho');

  const selectedChar: CharacterProfile =
    CHARACTER_PROFILES.find(c => c.id === selectedCharId) || CHARACTER_PROFILES[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Title */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-sans font-semibold">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Character Pathology & Series Bible</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-medium text-stone-900 dark:text-stone-100 tracking-tight">
          Comparative Pathology: The Interloper Archetypes
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-reading-serif max-w-3xl leading-relaxed">
          The intellectual core of the project contrasts two distinct third-party pathologies operating in Elena Mercer’s orbit: Sancho Blanco (The Boutique Tourist & Specialized Parasite) versus Rico Royale (The Hostile Corporate Raider & Invasive Species).
        </p>
      </div>

      {/* Character Selector Strip */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-3 border-b border-stone-200 dark:border-stone-800 no-scrollbar">
        {CHARACTER_PROFILES.map(char => {
          const active = char.id === selectedChar.id;
          return (
            <button
              key={char.id}
              onClick={() => {
                soundscapes.playPageTurn();
                setSelectedCharId(char.id);
              }}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 min-h-[44px] ${
                active
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100'
              }`}
            >
              <span>{char.name}</span>
              <span className="text-xs opacity-75">({char.archetype.split('&')[0].trim()})</span>
            </button>
          );
        })}
      </div>

      {/* Detailed Character Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
          <div>
            <div className="text-xs sm:text-sm uppercase tracking-widest text-amber-800 dark:text-amber-400 font-sans font-bold">
              {selectedChar.archetype}
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-stone-900 dark:text-stone-100">
              {selectedChar.name}
            </h2>
            <div className="text-sm text-stone-500 font-sans mt-0.5">
              Role: {selectedChar.role} · Age {selectedChar.age}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/50 text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-sans max-w-sm">
            <span className="font-semibold block text-stone-900 dark:text-stone-100 font-sans">
              Signature Object:
            </span>
            <span>{selectedChar.signatureObject}</span>
          </div>
        </div>

        {/* Key Quote */}
        <blockquote className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border-l-3 border-amber-600 italic font-reading-serif text-lg sm:text-xl text-stone-900 dark:text-stone-100 leading-relaxed">
          {selectedChar.keyQuote}
        </blockquote>

        {/* Ecological Model Analysis */}
        <div className="p-5 rounded-2xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-1.5 text-sm">
          <span className="font-semibold text-stone-900 dark:text-stone-100 font-sans uppercase tracking-wider block text-xs sm:text-sm">
            Ecological Model:
          </span>
          <p className="font-reading-serif text-base text-stone-800 dark:text-stone-200 leading-relaxed">
            {selectedChar.ecologicalModel}
          </p>
        </div>

        {/* Strengths & Flaws Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2.5">
            <div className="text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Core Strengths & Discipline</span>
            </div>
            <ul className="space-y-2 text-sm sm:text-base font-reading-serif text-stone-700 dark:text-stone-300 list-disc list-inside leading-relaxed">
              {selectedChar.strengths.map((str, i) => (
                <li key={i}>{str}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <div className="text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Vulnerabilities & Fatal Flaws</span>
            </div>
            <ul className="space-y-2 text-sm sm:text-base font-reading-serif text-stone-700 dark:text-stone-300 list-disc list-inside leading-relaxed">
              {selectedChar.fatalFlaws.map((flaw, i) => (
                <li key={i}>{flaw}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Critical Analytical Assessment */}
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-1.5">
          <span className="text-xs sm:text-sm font-sans font-semibold text-stone-400 uppercase tracking-wider block">
            Critical Narrative Function
          </span>
          <p className="text-base sm:text-lg font-reading-serif leading-relaxed text-stone-700 dark:text-stone-300">
            {selectedChar.analysis}
          </p>
        </div>
      </div>

      {/* Comparative Pathology Matrix: Sancho vs. Rico */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="space-y-1 border-b border-stone-200 dark:border-stone-800 pb-3">
          <h3 className="font-display font-semibold text-xl text-stone-900 dark:text-stone-100">
            Pathological Head-to-Head: Boutique Tourist vs. Corporate Raider
          </h3>
          <p className="text-xs text-stone-500 font-sans">
            How the two men in Elena’s orbit navigate marriage, boundaries, and consequences
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm font-reading-serif border-collapse">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-700 text-stone-400 font-sans uppercase text-[11px]">
                <th className="py-2.5 pr-4 font-semibold">Dimension</th>
                <th className="py-2.5 px-4 font-semibold text-amber-800 dark:text-amber-400">
                  Señor Sancho Blanco (Specialized Parasite)
                </th>
                <th className="py-2.5 pl-4 font-semibold text-stone-800 dark:text-stone-200">
                  Rico Royale (Hostile Invasive Raider)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-stone-500 text-xs">Primary Motivation</td>
                <td className="py-3 px-4 text-stone-800 dark:text-stone-200">
                  Zero-liability intimacy & curated validation under amber lighting.
                </td>
                <td className="py-3 pl-4 text-stone-800 dark:text-stone-200">
                  Spatial displacement and total domestic asset acquisition.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-stone-500 text-xs">Tactical Method</td>
                <td className="py-3 px-4 text-stone-800 dark:text-stone-200">
                  Strict transience, quiet exits, and public validation of the husband.
                </td>
                <td className="py-3 pl-4 text-stone-800 dark:text-stone-200">
                  Weaponized intimacy, passive-aggressive comparisons, and group chat leaks.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-stone-500 text-xs">View of Marriage</td>
                <td className="py-3 px-4 text-stone-800 dark:text-stone-200">
                  A temporary resort requiring host preservation.
                </td>
                <td className="py-3 pl-4 text-stone-800 dark:text-stone-200">
                  A distressed asset ripe for hostile takeover.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-stone-500 text-xs">Relationship to Husband</td>
                <td className="py-3 px-4 text-stone-800 dark:text-stone-200">
                  Respectful distance; shields Daniel’s public ego and repairs tent poles.
                </td>
                <td className="py-3 pl-4 text-stone-800 dark:text-stone-200">
                  Covert contempt; undermines Daniel from within under guise of loyalty.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-sans font-semibold text-stone-500 text-xs">Ultimate Outcome</td>
                <td className="py-3 px-4 text-stone-800 dark:text-stone-200">
                  Clean exit with boundaries acknowledged; final respectful nod.
                </td>
                <td className="py-3 pl-4 text-stone-800 dark:text-stone-200">
                  Expulsion, loss of the brass key, and total forfeiture of trust.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

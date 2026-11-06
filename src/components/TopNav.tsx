import React from 'react';
import { Volume2, VolumeX, Sliders, Sparkles } from 'lucide-react';
import { soundscapes } from '../utils/ambientAudio';

export type ActiveTab = 'shelf' | 'book1' | 'book2' | 'comparative' | 'code' | 'accounting' | 'dossier' | 'test';

interface TopNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenSettings: () => void;
  ambientPlaying: boolean;
  onToggleAmbient: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onTabChange,
  onOpenSettings,
  ambientPlaying,
  onToggleAmbient,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 dark:bg-[#151110]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onTabChange('shelf')}
          className="text-left group flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none"
        >
          <span className="w-7 h-7 rounded-full bg-amber-900/10 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 font-display font-bold flex items-center justify-center text-sm border border-amber-900/20 dark:border-amber-400/30">
            S
          </span>
          <span className="text-lg sm:text-xl font-display font-semibold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
            Señor Sancho Blanco
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={() => onTabChange('book1')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'book1'
                ? 'border-amber-800 text-stone-900 dark:text-white dark:border-amber-400 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            The Satirical Manual
          </button>

          <button
            onClick={() => onTabChange('book2')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'book2'
                ? 'border-sky-800 text-stone-900 dark:text-white dark:border-sky-400 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            The Novella
          </button>

          <button
            onClick={() => onTabChange('comparative')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 flex items-center gap-1.5 ${
              activeTab === 'comparative'
                ? 'border-amber-800 text-stone-900 dark:text-white dark:border-amber-400 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Theory vs. Reality
          </button>

          <button
            onClick={() => onTabChange('code')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'code'
                ? 'border-amber-800 text-stone-900 dark:text-white dark:border-amber-400 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            The Blanco Code
          </button>

          <button
            onClick={() => onTabChange('accounting')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'accounting'
                ? 'border-amber-800 text-stone-900 dark:text-white dark:border-amber-400 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Fantasy Accounting
          </button>

          <button
            onClick={() => onTabChange('test')}
            className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'test'
                ? 'border-amber-800 text-stone-900 dark:text-white dark:border-amber-400 font-semibold'
                : 'border-transparent hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Protocol Field Test
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Ambient Soundscape Toggle */}
          <button
            onClick={() => {
              onToggleAmbient();
              soundscapes.playPageTurn();
            }}
            className={`flex items-center gap-2 px-3.5 py-2 min-h-[44px] rounded-lg text-sm font-medium border transition-all whitespace-nowrap shrink-0 ${
              ambientPlaying
                ? 'bg-amber-950/10 text-amber-900 border-amber-800/30 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-400/40'
                : 'bg-stone-100 text-stone-700 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700 hover:text-stone-900 dark:hover:text-stone-100'
            }`}
            title={ambientPlaying ? 'Mute 2700K ambient rain & restaurant hum' : 'Play 2700K ambient restaurant soundscape'}
            aria-label="Toggle ambient soundscape"
          >
            {ambientPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-700 dark:text-amber-400 animate-pulse" />
                <span className="hidden sm:inline">La Paloma Ambiance</span>
                <span className="sm:hidden">Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline">Ambient Off</span>
                <span className="sm:hidden">Audio</span>
              </>
            )}
          </button>

          {/* Reading Preferences / Typography Modal Button */}
          <button
            onClick={onOpenSettings}
            className="px-3.5 py-2 min-h-[44px] rounded-lg text-sm font-medium bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 hover:bg-stone-800 dark:hover:bg-white transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 shadow-sm"
            aria-label="Reader settings and themes"
          >
            <Sliders className="w-4 h-4" />
            <span className="inline">Settings</span>
          </button>
        </div>
      </div>

      {/* Mobile Secondary Navigation Ribbon */}
      <div className="lg:hidden flex items-center overflow-x-auto gap-2 px-3 py-2.5 border-t border-stone-200 dark:border-stone-800 text-sm no-scrollbar">
        <button
          onClick={() => onTabChange('shelf')}
          className={`whitespace-nowrap px-3 py-2 min-h-[44px] rounded-lg font-medium transition-colors ${
            activeTab === 'shelf'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          Book Shelf
        </button>
        <button
          onClick={() => onTabChange('book1')}
          className={`whitespace-nowrap px-3 py-2 min-h-[44px] rounded-lg font-medium transition-colors ${
            activeTab === 'book1'
              ? 'bg-amber-900 text-white dark:bg-amber-400 dark:text-stone-950 font-semibold'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          Manual
        </button>
        <button
          onClick={() => onTabChange('book2')}
          className={`whitespace-nowrap px-3 py-2 min-h-[44px] rounded-lg font-medium transition-colors ${
            activeTab === 'book2'
              ? 'bg-sky-900 text-white dark:bg-sky-400 dark:text-stone-950 font-semibold'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          Novella
        </button>
        <button
          onClick={() => onTabChange('comparative')}
          className={`whitespace-nowrap px-3 py-2 min-h-[44px] rounded-lg font-medium transition-colors ${
            activeTab === 'comparative'
              ? 'bg-amber-800 text-white dark:bg-amber-500 dark:text-stone-950 font-semibold'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          Theory vs Reality
        </button>
        <button
          onClick={() => onTabChange('code')}
          className={`whitespace-nowrap px-3 py-2 min-h-[44px] rounded-lg font-medium transition-colors ${
            activeTab === 'code'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          Blanco Code
        </button>
        <button
          onClick={() => onTabChange('accounting')}
          className={`whitespace-nowrap px-3 py-2 min-h-[44px] rounded-lg font-medium transition-colors ${
            activeTab === 'accounting'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          Accounting
        </button>
        <button
          onClick={() => onTabChange('test')}
          className={`whitespace-nowrap px-3 py-2 min-h-[44px] rounded-lg font-medium transition-colors ${
            activeTab === 'test'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          Protocol Test
        </button>
      </div>
    </header>
  );
};

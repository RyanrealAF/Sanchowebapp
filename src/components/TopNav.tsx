import React from 'react';
import { BookOpen, BookText, Columns3, Settings2, Volume2, VolumeX } from 'lucide-react';
import { soundscapes } from '../utils/ambientAudio';

export type ActiveTab = 'shelf' | 'book1' | 'book2' | 'comparative';

interface TopNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenSettings: () => void;
  ambientPlaying: boolean;
  onToggleAmbient: () => void;
}

const links: { id: ActiveTab; label: string; short: string; icon: React.ReactNode }[] = [
  { id: 'shelf', label: 'The Establishment', short: 'Home', icon: <BookOpen className="h-4 w-4" /> },
  { id: 'book1', label: 'The Manual', short: 'Manual', icon: <BookText className="h-4 w-4" /> },
  { id: 'book2', label: 'The Novella', short: 'Novella', icon: <BookOpen className="h-4 w-4" /> },
  { id: 'comparative', label: 'Theory vs. Reality', short: 'Compare', icon: <Columns3 className="h-4 w-4" /> },
];

export const TopNav: React.FC<TopNavProps> = ({
  activeTab, onTabChange, onOpenSettings, ambientPlaying, onToggleAmbient,
}) => (
  <header className="sticky top-0 z-40 border-b border-[#5B4937]/60 bg-[#171311]/95 text-[#EDE2D0] backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 py-3">
      <button onClick={() => onTabChange('shelf')} className="group flex min-w-0 items-center gap-3 text-left">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#B9935D]/60 bg-[#38291F] font-display text-lg font-bold text-[#D9B77D]">S</span>
        <span className="min-w-0">
          <span className="block truncate font-display text-lg font-semibold tracking-wide text-[#E9D8BD] sm:text-xl">SANCHO BLANCO</span>
          <span className="hidden text-[9px] uppercase tracking-[0.2em] text-[#A68C6B] sm:block">The art of being the perfect other guy</span>
        </span>
      </button>

      <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
        {links.map(link => (
          <button key={link.id} onClick={() => onTabChange(link.id)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${activeTab === link.id ? 'bg-[#3A2B20] text-[#E7C58C]' : 'text-stone-400 hover:bg-white/5 hover:text-stone-100'}`}>
            {link.icon}<span>{link.label}</span>
          </button>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-2">
        <button onClick={() => { onToggleAmbient(); soundscapes.playPageTurn(); }}
          className="flex h-10 items-center gap-2 rounded-lg border border-[#6B5740]/60 px-3 text-xs text-[#C9B99F] transition hover:border-[#B9935D] hover:text-[#E7C58C]"
          aria-label={ambientPlaying ? 'Turn ambient sound off' : 'Turn ambient sound on'} title="Cabaret ambience">
          {ambientPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          <span className="hidden 2xl:inline">{ambientPlaying ? 'Ambience on' : 'Ambience off'}</span>
        </button>
        <button onClick={onOpenSettings} className="flex h-10 items-center gap-2 rounded-lg bg-[#B9935D] px-3 text-xs font-semibold text-[#211810] transition hover:bg-[#D2B47D]" aria-label="Reader settings">
          <Settings2 className="h-4 w-4" /><span className="hidden sm:inline">Reader</span>
        </button>
      </div>
    </div>

    <nav className="flex gap-1 overflow-x-auto border-t border-white/5 px-3 py-2 xl:hidden" aria-label="Mobile navigation">
      {links.map(link => (
        <button key={link.id} onClick={() => onTabChange(link.id)}
          className={`flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-xs font-medium transition-colors ${activeTab === link.id ? 'bg-[#B9935D] text-[#211810]' : 'text-stone-400 hover:bg-white/5 hover:text-stone-100'}`}>
          {link.icon}<span>{link.short}</span>
        </button>
      ))}
    </nav>
  </header>
);

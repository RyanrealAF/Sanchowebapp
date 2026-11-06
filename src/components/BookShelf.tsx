import React from 'react';
import { BookOpen, Sparkles, Scale, Compass, ArrowRight, Bookmark } from 'lucide-react';
import { BOOKS_INFO } from '../utils/bookData';
import { ActiveTab } from './TopNav';
import { soundscapes } from '../utils/ambientAudio';

interface BookShelfProps {
  onSelectBook: (bookId: 'book1' | 'book2', chapterId?: string) => void;
  onOpenComparative: () => void;
  onOpenCompanion: (tab: ActiveTab) => void;
  savedBookmarksCount: number;
}

export const BookShelf: React.FC<BookShelfProps> = ({
  onSelectBook,
  onOpenComparative,
  onOpenCompanion,
  savedBookmarksCount,
}) => {
  const book1 = BOOKS_INFO.book1;
  const book2 = BOOKS_INFO.book2;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-sans">
          <span>The Señor Sancho Blanco Project</span>
          <span aria-hidden="true">·</span>
          <span>Dual Interactive Volumes</span>
          <span aria-hidden="true">·</span>
          <span>Curated Edition</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-stone-900 dark:text-stone-100 tracking-tight leading-tight">
          Two Interactive Books. <br />
          <span className="italic font-normal text-amber-900 dark:text-amber-300">
            One Questionable Decision.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-reading-serif leading-relaxed">
          Explore the razor-sharp satirical manual of high protocol, spatial containment, and boutique transience alongside the complete narrative case study that tested its laws against real-life Atlanta friction.
        </p>

        {savedBookmarksCount > 0 && (
          <div className="pt-2 text-xs text-stone-500 flex items-center justify-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{savedBookmarksCount} saved bookmark{savedBookmarksCount > 1 ? 's' : ''} across your library</span>
          </div>
        )}
      </div>

      {/* The Two Books Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {/* Book 1: The Satirical Manual */}
        <div className="group rounded-2xl bg-white dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-40 sm:w-48 shrink-0 rounded-xl overflow-hidden shadow-lg border border-stone-200/60 dark:border-stone-700 aspect-[3/4] bg-stone-100 mx-auto sm:mx-0">
                <img
                  src={book1.coverImage}
                  alt={book1.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-2.5 flex-1">
                <div className="text-xs sm:text-sm uppercase tracking-widest text-amber-800 dark:text-amber-400 font-sans font-semibold">
                  Volume I · The Behavioral Framework
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                  {book1.title}
                </h2>
                <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400 italic">
                  {book1.subtitle}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                  <span>23 Chapters + Files</span>
                  <span aria-hidden="true">·</span>
                  <span>7 Blanco Laws</span>
                  <span aria-hidden="true">·</span>
                  <span>~38k words</span>
                </div>
              </div>
            </div>

            <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 font-reading-serif leading-relaxed">
              {book1.description} Features complete chapters with Sancho’s Laws, the didactic Lectures, the La Paloma Case Studies, and the unsparing Reality Checks where the unspent punchline extracts its toll.
            </p>

            <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/50 rounded-xl p-4 text-sm sm:text-base text-amber-950 dark:text-amber-200 space-y-1.5">
              <span className="font-semibold block font-sans text-xs sm:text-sm uppercase tracking-wider text-amber-900 dark:text-amber-300">Core Tenet:</span>
              <span className="italic font-reading-serif block leading-relaxed">
                “The king has the throne. The queen has the vote. And you, caballero, have a reservation. A visit is not a residence.”
              </span>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-stone-200/70 dark:border-stone-800 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <button
              onClick={() => {
                soundscapes.playPageTurn();
                onSelectBook('book1', 'b1-ch1');
              }}
              className="px-6 py-3 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 text-base font-medium hover:bg-stone-800 dark:hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-sm min-h-[48px]"
            >
              <BookOpen className="w-5 h-5" />
              <span>Read Manual (Ch. 1)</span>
            </button>

            <button
              onClick={() => {
                soundscapes.playPageTurn();
                onSelectBook('book1', 'b1-prologue');
              }}
              className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors flex items-center justify-center gap-1.5 font-medium min-h-[44px]"
            >
              <span>Prologue: Unqualified Instructor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Book 2: The Narrative Novella */}
        <div className="group rounded-2xl bg-white dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-40 sm:w-48 shrink-0 rounded-xl overflow-hidden shadow-lg border border-stone-200/60 dark:border-stone-700 aspect-[3/4] bg-stone-100 mx-auto sm:mx-0">
                <img
                  src={book2.coverImage}
                  alt={book2.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-2.5 flex-1">
                <div className="text-xs sm:text-sm uppercase tracking-widest text-sky-800 dark:text-sky-400 font-sans font-semibold">
                  Volume II · The Empirical Case Study
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                  {book2.title}
                </h2>
                <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400 italic">
                  {book2.subtitle}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                  <span>10 Chapters + Series Bible</span>
                  <span aria-hidden="true">·</span>
                  <span>Foreword by Tasha Green</span>
                  <span aria-hidden="true">·</span>
                  <span>Novella Draft</span>
                </div>
              </div>
            </div>

            <p className="text-base sm:text-lg text-stone-700 dark:text-stone-300 font-reading-serif leading-relaxed">
              {book2.description} From the 40-mph botanical gale where Sancho holds Daniel’s tent poles in the rain, to the group chat ambush and the kitchen confrontation with Daniel’s label maker and single brass key.
            </p>

            <div className="bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-900/50 rounded-xl p-4 text-sm sm:text-base text-sky-950 dark:text-sky-200 space-y-1.5">
              <span className="font-semibold block font-sans text-xs sm:text-sm uppercase tracking-wider text-sky-900 dark:text-sky-300">Tasha Green’s Opening Verdict:</span>
              <span className="italic font-reading-serif block leading-relaxed">
                “Keeping things uncomplicated isn’t a noble philosophy. It’s simply the cheapest way to stay charming and free.”
              </span>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-stone-200/70 dark:border-stone-800 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <button
              onClick={() => {
                soundscapes.playPageTurn();
                onSelectBook('book2', 'b2-ch1');
              }}
              className="px-6 py-3 rounded-xl bg-sky-900 text-white dark:bg-sky-100 dark:text-sky-950 text-base font-medium hover:bg-sky-800 dark:hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-sm min-h-[48px]"
            >
              <BookOpen className="w-5 h-5" />
              <span>Read Novella (Ch. 1)</span>
            </button>

            <button
              onClick={() => {
                soundscapes.playPageTurn();
                onSelectBook('book2', 'b2-foreword');
              }}
              className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors flex items-center justify-center gap-1.5 font-medium min-h-[44px]"
            >
              <span>Foreword by Tasha Green</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Banner: Theory vs. Reality Comparative Reading */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-900 text-stone-100">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="/src/assets/images/la_paloma_amber_interior_1793988829547.jpg"
            alt="La Paloma Amber Interior"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
        </div>

        <div className="relative z-10 p-8 sm:p-12 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest text-amber-400 font-sans font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Editorial Mode</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-display font-medium text-white tracking-tight leading-snug">
            Theory vs. Reality: Synchronized Reading
          </h3>

          <p className="text-base sm:text-lg text-stone-200 font-reading-serif leading-relaxed">
            Witness the structural dialogue between both texts side-by-side: each instructional law of the Blanco Code mapped directly against the moment it was tested, strained, or broken in the Atlanta case study.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                soundscapes.playPageTurn();
                onOpenComparative();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium text-base transition-colors flex items-center justify-center gap-2 shadow-md min-h-[48px]"
            >
              <span>Launch Parallel Theory & Case Study Reader</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Companions Ribbon */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
          <h4 className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-sans font-semibold">
            Interactive Companion Modules & Analysis
          </h4>
          <span className="text-xs text-stone-400 dark:text-stone-500">4 Tools Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Module 1: The Blanco Code */}
          <button
            onClick={() => {
              soundscapes.playPageTurn();
              onOpenCompanion('code');
            }}
            className="text-left p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-700/60 dark:hover:border-amber-400/60 transition-all space-y-2.5 group shadow-xs min-h-[160px]"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h5 className="font-display font-semibold text-stone-900 dark:text-stone-100 text-lg group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
              The 7 Non-Negotiables
            </h5>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
              Inspect all 7 laws with operational mechanics, failure points, and Tasha’s reality checks.
            </p>
          </button>

          {/* Module 2: Fantasy Accounting */}
          <button
            onClick={() => {
              soundscapes.playPageTurn();
              onOpenCompanion('accounting');
            }}
            className="text-left p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-700/60 dark:hover:border-amber-400/60 transition-all space-y-2.5 group shadow-xs min-h-[160px]"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h5 className="font-display font-semibold text-stone-900 dark:text-stone-100 text-lg group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
              Fantasy Accounting Simulator
            </h5>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
              Audit Sancho’s zero-liability assets against Daniel’s heavy domestic mortgage ledger.
            </p>
          </button>

          {/* Module 3: Protocol Field Test */}
          <button
            onClick={() => {
              soundscapes.playPageTurn();
              onOpenCompanion('test');
            }}
            className="text-left p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-700/60 dark:hover:border-amber-400/60 transition-all space-y-2.5 group shadow-xs min-h-[160px]"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h5 className="font-display font-semibold text-stone-900 dark:text-stone-100 text-lg group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
              Protocol Field Test
            </h5>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
              Interactive dilemmas: test what you would do during the Burnt Sauce and Marquee Squall.
            </p>
          </button>

          {/* Module 4: Pathology Dossier */}
          <button
            onClick={() => {
              soundscapes.playPageTurn();
              onOpenCompanion('dossier');
            }}
            className="text-left p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-700/60 dark:hover:border-amber-400/60 transition-all space-y-2.5 group shadow-xs min-h-[160px]"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h5 className="font-display font-semibold text-stone-900 dark:text-stone-100 text-lg group-hover:text-sky-800 dark:group-hover:text-sky-400 transition-colors">
              Comparative Pathology Dossier
            </h5>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
              Compare Sancho (Specialized Parasite) vs. Rico Royale (Invasive Corporate Raider).
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

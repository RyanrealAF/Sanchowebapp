import React, { useState } from 'react';
import { Sparkles, ArrowRight, Columns, Rows, BookOpen } from 'lucide-react';
import { BOOK_1_CHAPTERS, BOOK_2_CHAPTERS } from '../utils/bookData';
import { soundscapes } from '../utils/ambientAudio';

interface PairItem {
  id: string;
  title: string;
  theme: string;
  book1ChapterId: string;
  book2ChapterId: string;
  editorialInsight: string;
}

const COMPARATIVE_PAIRS: PairItem[] = [
  {
    id: 'pair-1',
    title: 'The Reservation & The Socket Wrenches',
    theme: 'Law I & V: History vs. Appointment',
    book1ChapterId: 'b1-ch1',
    book2ChapterId: 'b2-ch1',
    editorialInsight:
      'In the manual, Sancho formulates the theory of suppressing the joke about Daniel’s spreadsheet spontaneity. In the novella, he puts it into action under La Paloma’s copper lantern, defending Daniel’s metric sockets at 2:00 AM.',
  },
  {
    id: 'pair-2',
    title: 'Confidence Without the Crown vs. The Best Friend’s Discount',
    theme: 'Refusing Competition vs. Covert Sabotage',
    book1ChapterId: 'b1-ch2',
    book2ChapterId: 'b2-ch2',
    editorialInsight:
      'Contrast in male positioning: Sancho defends Daniel taking the risk to cook (the "smoky finish"), while Rico weaponizes Daniel’s three-month college engine rebuild to paint him as emotionally negligent.',
  },
  {
    id: 'pair-3',
    title: 'The Fragile Ego Protection Program vs. The Botanical Squall',
    theme: 'Rule 4.1 in Driving Rain',
    book1ChapterId: 'b1-ch4',
    book2ChapterId: 'b2-ch3',
    editorialInsight:
      'Theory meets 40-mph wind: The manual codifies "never correct or compete in public." The novella shows Sancho stepping out into the mud, holding the canvas marquee tension pole, and ensuring Daniel receives the applause.',
  },
  {
    id: 'pair-4',
    title: 'The Group Chat Trap & Digital Perimeter Security',
    theme: 'Family Chats as Digital Crime Scenes',
    book1ChapterId: 'b1-ch16',
    book2ChapterId: 'b2-ch4',
    editorialInsight:
      'Digital exposure: In the manual, Sancho warns that group chats preserve screenshots forever. In the novella, Rico drops Sancho’s photo in front of Daniel’s mother Evelyn, forcing a 42-second deletion.',
  },
  {
    id: 'pair-5',
    title: 'The Cleared Field & Elena’s Autonomous Choice',
    theme: 'Law VII: Know When to Leave',
    book1ChapterId: 'b1-ch18',
    book2ChapterId: 'b2-ch6',
    editorialInsight:
      'The critical turning point: Rico lies about Nashville to set a weekend trap. Sancho refuses to take a key from someone pushing a brother out. Elena exercises full moral agency, refusing to be moved like a piece on a chessboard.',
  },
  {
    id: 'pair-6',
    title: 'The Kitchen Confrontation & Revocation of Access',
    theme: 'Single Brass Key & The Label Maker',
    book1ChapterId: 'b1-ch23',
    book2ChapterId: 'b2-ch7',
    editorialInsight:
      'Eviction of the squatter: Daniel waits with his label maker and an open hand. Rico surrenders the 12-year key into the summer rain. The King restores domestic boundaries without melodrama.',
  },
];

interface ComparativeReaderProps {
  fontSize?: 'sm' | 'md' | 'lg' | 'xl';
  onFontSizeChange?: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  fontFamily?: 'serif' | 'sans';
}

export const ComparativeReader: React.FC<ComparativeReaderProps> = ({
  fontSize = 'md',
  onFontSizeChange,
  fontFamily = 'serif',
}) => {
  const [selectedPairId, setSelectedPairId] = useState(COMPARATIVE_PAIRS[0].id);
  const [layoutMode, setLayoutMode] = useState<'split' | 'stacked'>('split');

  const FONT_SIZES: ('sm' | 'md' | 'lg' | 'xl')[] = ['sm', 'md', 'lg', 'xl'];
  const currentSizeIdx = FONT_SIZES.indexOf(fontSize);

  const handleDecreaseFont = () => {
    if (onFontSizeChange && currentSizeIdx > 0) {
      onFontSizeChange(FONT_SIZES[currentSizeIdx - 1]);
    }
  };

  const handleIncreaseFont = () => {
    if (onFontSizeChange && currentSizeIdx < FONT_SIZES.length - 1) {
      onFontSizeChange(FONT_SIZES[currentSizeIdx + 1]);
    }
  };

  const fontSizeClass = {
    sm: 'text-base sm:text-lg leading-relaxed',
    md: 'text-lg sm:text-xl leading-relaxed sm:leading-loose',
    lg: 'text-xl sm:text-2xl leading-loose',
    xl: 'text-2xl sm:text-3xl leading-loose',
  }[fontSize];

  const fontClass = fontFamily === 'serif' ? 'font-reading-serif' : 'font-reading-sans';

  const currentPair = COMPARATIVE_PAIRS.find(p => p.id === selectedPairId) || COMPARATIVE_PAIRS[0];

  const book1Chapter = BOOK_1_CHAPTERS.find(c => c.id === currentPair.book1ChapterId) || BOOK_1_CHAPTERS[1];
  const book2Chapter = BOOK_2_CHAPTERS.find(c => c.id === currentPair.book2ChapterId) || BOOK_2_CHAPTERS[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Editorial Title Banner */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-sans font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pathway 1: The Unified Hybrid Book</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-medium text-stone-900 dark:text-stone-100 tracking-tight">
          Theory vs. Reality: The Blanco Code Under Stress
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 font-reading-serif max-w-3xl leading-relaxed">
          Read Sancho’s pedagogical rules side-by-side with the unfolding Atlanta case study. See how each law of the Blanco Code was formulated in theory, and how it cracked, held, or transformed in practice.
        </p>
      </div>

      {/* Synchronized Pair Navigation Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0 no-scrollbar w-full sm:w-auto">
          <span className="text-xs uppercase tracking-wider text-stone-400 font-sans font-semibold whitespace-nowrap mr-2">
            Paired Case:
          </span>
          {COMPARATIVE_PAIRS.map((pair, idx) => (
            <button
              key={pair.id}
              onClick={() => {
                soundscapes.playPageTurn();
                setSelectedPairId(pair.id);
              }}
              className={`px-3.5 py-2 min-h-[44px] rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                pair.id === currentPair.id
                  ? 'bg-amber-800 text-white dark:bg-amber-500 dark:text-stone-950 shadow-sm font-semibold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100'
              }`}
            >
              Case {idx + 1}: {pair.theme.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Font Size Stepper & Layout Toggle */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto justify-end">
          {onFontSizeChange && (
            <div
              className="flex items-center gap-0.5 bg-stone-100 dark:bg-stone-800/80 rounded-lg p-0.5 border border-stone-200 dark:border-stone-700 mr-1"
              role="group"
              aria-label="Font size controls"
            >
              <button
                onClick={handleDecreaseFont}
                disabled={currentSizeIdx === 0}
                aria-label="Decrease font size"
                title="Decrease font size"
                className="p-1.5 min-w-[32px] min-h-[36px] flex items-center justify-center rounded-md text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 disabled:opacity-30 disabled:hover:bg-transparent font-medium text-xs transition-colors"
              >
                A-
              </button>
              <span
                className="text-[11px] font-sans font-bold text-stone-700 dark:text-stone-300 px-1 select-none min-w-[28px] text-center"
                title={`Current font size: ${fontSize.toUpperCase()}`}
              >
                {fontSize === 'sm' ? 'Std' : fontSize === 'md' ? 'Lg' : fontSize === 'lg' ? 'XL' : 'XXL'}
              </span>
              <button
                onClick={handleIncreaseFont}
                disabled={currentSizeIdx === FONT_SIZES.length - 1}
                aria-label="Increase font size"
                title="Increase font size"
                className="p-1.5 min-w-[32px] min-h-[36px] flex items-center justify-center rounded-md text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 disabled:opacity-30 disabled:hover:bg-transparent font-medium text-xs transition-colors"
              >
                A+
              </button>
            </div>
          )}

          <span className="text-xs text-stone-400 mr-1 hidden sm:inline">View:</span>
          <button
            onClick={() => setLayoutMode('split')}
            className={`p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-sm transition-colors ${
              layoutMode === 'split'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
            title="Side-by-side split view"
          >
            <Columns className="w-5 h-5" />
          </button>
          <button
            onClick={() => setLayoutMode('stacked')}
            className={`p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-sm transition-colors ${
              layoutMode === 'stacked'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
            title="Stacked continuous view"
          >
            <Rows className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Editorial Synthesis Callout Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 space-y-2.5">
        <div className="flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider text-amber-800 dark:text-amber-400 font-sans font-semibold">
          <span>{currentPair.title}</span>
          <span aria-hidden="true">·</span>
          <span>{currentPair.theme}</span>
        </div>
        <p className="text-base sm:text-lg text-stone-800 dark:text-stone-200 font-reading-serif leading-relaxed italic">
          “{currentPair.editorialInsight}”
        </p>
      </div>

      {/* Side-by-Side or Stacked Dual Texts */}
      <div
        className={`grid gap-8 ${
          layoutMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {/* Column Left: Book 1 - The Theoretical Manual */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-amber-900/20 dark:border-amber-500/20 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-sans font-semibold">
                Volume I · The Satirical Manual
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-stone-900 dark:text-stone-100">
                {book1Chapter.title}
              </h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>

          {book1Chapter.sanchosLaw && (
            <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-center space-y-1.5">
              <div className="text-xs font-sans font-bold text-amber-800 dark:text-amber-400 uppercase tracking-widest">
                Sancho’s Law
              </div>
              <p className="text-lg sm:text-xl font-display font-semibold italic text-stone-900 dark:text-stone-100">
                “{book1Chapter.sanchosLaw}”
              </p>
            </div>
          )}

          <div className={`space-y-6 text-stone-800 dark:text-stone-200 ${fontClass} ${fontSizeClass}`}>
            {book1Chapter.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                {sec.heading && (
                  <h3 className="font-display font-semibold text-stone-900 dark:text-stone-100 text-xl sm:text-2xl pt-2 border-b border-stone-100 dark:border-stone-800 pb-1">
                    {sec.heading}
                  </h3>
                )}
                <p className="whitespace-pre-line">{sec.content}</p>
              </div>
            ))}
          </div>

          {book1Chapter.blancoRule && (
            <div className="p-5 rounded-xl bg-stone-900 text-stone-100 dark:bg-stone-950 text-center space-y-1.5 shadow-sm">
              <div className="text-xs font-sans font-bold text-amber-400 uppercase tracking-widest">
                The Blanco Rule
              </div>
              <p className="text-base sm:text-lg font-display font-medium">{book1Chapter.blancoRule}</p>
            </div>
          )}
        </div>

        {/* Column Right: Book 2 - The Narrative Case Study */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-sky-900/20 dark:border-sky-500/20 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
            <div>
              <div className="text-xs uppercase tracking-widest text-sky-800 dark:text-sky-400 font-sans font-semibold">
                Volume II · The Empirical Case Study
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-stone-900 dark:text-stone-100">
                {book2Chapter.title}
              </h2>
            </div>
            <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 flex items-center justify-center shrink-0">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-900/50 space-y-1.5">
            <div className="text-xs font-sans font-semibold text-sky-900 dark:text-sky-300 uppercase tracking-widest">
              Narrative Setting & Continuity
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-300 font-sans">
              Characters: {book2Chapter.characters.join(', ')} · Setting: La Paloma & Atlanta
            </p>
          </div>

          <div className={`space-y-6 text-stone-800 dark:text-stone-200 ${fontClass} ${fontSizeClass}`}>
            {book2Chapter.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                {sec.heading && (
                  <h3 className="font-display font-semibold text-stone-900 dark:text-stone-100 text-xl sm:text-2xl pt-2 border-b border-stone-100 dark:border-stone-800 pb-1">
                    {sec.heading}
                  </h3>
                )}
                <p className="whitespace-pre-line">{sec.content}</p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-1.5 text-sm text-stone-700 dark:text-stone-300">
            <span className="font-semibold text-stone-900 dark:text-stone-100 font-sans block text-xs uppercase tracking-wider">
              Case Study Takeaway:
            </span>
            <span className="font-reading-serif leading-relaxed block">
              {book2Chapter.summary}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

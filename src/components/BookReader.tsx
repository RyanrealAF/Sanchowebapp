import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Search,
  Sparkles,
  Link as LinkIcon,
  X,
  Volume2,
} from 'lucide-react';
import { BookChapter, BookInfo } from '../utils/bookData';
import { searchInChapters } from '../utils/bookLogic';
import { soundscapes } from '../utils/ambientAudio';

interface BookReaderProps {
  book: BookInfo;
  chapters: BookChapter[];
  allChapters: BookChapter[];
  currentChapterId: string;
  onSelectChapter: (chapterId: string) => void;
  onNavigateToLinkedChapter?: (bookId: 'book1' | 'book2', chapterId: string) => void;
  bookmarks: string[];
  onToggleBookmark: (chapterId: string) => void;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  onFontSizeChange?: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  fontFamily: 'serif' | 'sans';
}

export const BookReader: React.FC<BookReaderProps> = ({
  book,
  chapters,
  allChapters,
  currentChapterId,
  onSelectChapter,
  onNavigateToLinkedChapter,
  bookmarks,
  onToggleBookmark,
  fontSize,
  onFontSizeChange,
  fontFamily,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [laughToast, setLaughToast] = useState(false);

  const currentChapterIndex = chapters.findIndex(c => c.id === currentChapterId);
  const currentChapter = chapters[currentChapterIndex] || chapters[0];

  const prevChapter = currentChapterIndex > 0 ? chapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex < chapters.length - 1 ? chapters[currentChapterIndex + 1] : null;

  const isBookmarked = bookmarks.includes(currentChapter.id);

  // Search results
  const searchResults = searchQuery ? searchInChapters(searchQuery, allChapters) : [];

  // Track scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentChapterId]);

  // Scroll to top when chapter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentChapterId]);

  const handlePlayLaugh = () => {
    soundscapes.playSanchoChime();
    setLaughToast(true);
    setTimeout(() => setLaughToast(false), 3000);
  };

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

  return (
    <div className="relative min-h-screen">
      {/* Top Thin Reading Progress Bar */}
      <div
        className="fixed top-[57px] left-0 right-0 h-1 bg-amber-600/20 dark:bg-amber-400/20 z-30"
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        <div
          className="h-full bg-amber-700 dark:bg-amber-400 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex gap-8">
        {/* Desktop Sticky Table of Contents Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 self-start sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-sans font-semibold">
              Table of Contents
            </div>
            <span className="text-xs text-stone-400">{chapters.length} chapters</span>
          </div>

          {/* Quick Search in Chapters */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
            <input
              type="text"
              placeholder="Search chapters & keywords..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-lg bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:outline-none focus:border-amber-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchQuery && (
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg p-2 space-y-2 shadow-lg max-h-60 overflow-y-auto">
              <div className="text-[11px] font-sans font-semibold text-stone-400 px-1">
                {searchResults.length} matches found:
              </div>
              {searchResults.length === 0 ? (
                <div className="text-xs text-stone-500 p-2">No occurrences found.</div>
              ) : (
                searchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onSelectChapter(`b${res.bookId === 'book1' ? '1' : '2'}-ch${res.chapterNumber}`);
                      setSearchQuery('');
                      soundscapes.playPageTurn();
                    }}
                    className="w-full text-left p-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800 text-xs text-stone-700 dark:text-stone-300 transition-colors"
                  >
                    <div className="font-semibold text-amber-900 dark:text-amber-300">
                      {res.bookId === 'book1' ? 'Manual' : 'Novella'} · Ch. {res.chapterNumber}
                    </div>
                    <div className="text-[11px] text-stone-500 truncate">{res.matchSnippet}</div>
                  </button>
                ))
              )}
            </div>
          )}

          {/* Chapter Links List */}
          <nav className="space-y-1">
            {chapters.map(ch => {
              const active = ch.id === currentChapter.id;
              const bookmarked = bookmarks.includes(ch.id);

              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    soundscapes.playPageTurn();
                    onSelectChapter(ch.id);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between group ${
                    active
                      ? 'bg-amber-950/10 text-amber-950 dark:bg-amber-500/20 dark:text-amber-200 font-semibold border-l-2 border-amber-800 dark:border-amber-400'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-200'
                  }`}
                >
                  <div className="truncate pr-2">
                    <span className="text-[11px] text-stone-400 dark:text-stone-500 mr-1.5">
                      {ch.chapterNumber === 0 ? 'Intro' : `Ch. ${ch.chapterNumber}`}
                    </span>
                    <span>{ch.title.replace(/^Chapter \d+:\s*/, '')}</span>
                  </div>

                  {bookmarked && (
                    <BookmarkCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Reading Canvas */}
        <main className="flex-1 max-w-3xl mx-auto space-y-10">
          {/* Reader Top Action Bar */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800 text-sm text-stone-500">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden px-3.5 py-2.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 font-medium flex items-center gap-1.5 min-h-[44px] text-sm"
              >
                <BookOpen className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>Contents</span>
              </button>

              <span className="hidden sm:inline font-sans text-stone-400 uppercase tracking-wider text-xs">
                {book.shortTitle}
              </span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-xs sm:text-sm">{currentChapter.readingMinutes} min read</span>
            </div>

            <div className="flex items-center gap-2">
              {/* In-reader Font Size Stepper (Persistent across books) */}
              {onFontSizeChange && (
                <div
                  className="flex items-center gap-0.5 bg-stone-100 dark:bg-stone-800/80 rounded-lg p-0.5 border border-stone-200 dark:border-stone-700"
                  role="group"
                  aria-label="Font size controls"
                >
                  <button
                    onClick={handleDecreaseFont}
                    disabled={currentSizeIdx === 0}
                    aria-label="Decrease font size"
                    title="Decrease font size"
                    className="p-1.5 min-w-[36px] min-h-[40px] flex items-center justify-center rounded-md text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 disabled:opacity-30 disabled:hover:bg-transparent font-medium text-xs transition-colors"
                  >
                    A-
                  </button>
                  <span
                    className="text-[11px] font-sans font-bold text-stone-700 dark:text-stone-300 px-1 select-none min-w-[30px] text-center"
                    title={`Current font size: ${fontSize.toUpperCase()}`}
                  >
                    {fontSize === 'sm' ? 'Std' : fontSize === 'md' ? 'Lg' : fontSize === 'lg' ? 'XL' : 'XXL'}
                  </span>
                  <button
                    onClick={handleIncreaseFont}
                    disabled={currentSizeIdx === FONT_SIZES.length - 1}
                    aria-label="Increase font size"
                    title="Increase font size"
                    className="p-1.5 min-w-[36px] min-h-[40px] flex items-center justify-center rounded-md text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 disabled:opacity-30 disabled:hover:bg-transparent font-medium text-xs transition-colors"
                  >
                    A+
                  </button>
                </div>
              )}

              {/* Play Sancho Laugh Sound */}
              <button
                onClick={handlePlayLaugh}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-amber-800/30 dark:border-amber-400/40 text-amber-900 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors font-sans text-xs sm:text-sm font-medium min-h-[44px]"
                title="Hear Sancho's trademark punctuation chime: ¡JAJAJAJA!"
                aria-label="Play Sancho laugh chime"
              >
                <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="hidden sm:inline">¡JAJAJAJA!</span>
              </button>

              {/* Bookmark Toggle */}
              <button
                onClick={() => onToggleBookmark(currentChapter.id)}
                className={`p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border transition-colors ${
                  isBookmarked
                    ? 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-950/50 dark:border-amber-800 dark:text-amber-300'
                    : 'border-stone-200 dark:border-stone-700 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark this chapter'}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this chapter'}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-5 h-5" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Witty Sancho Toast on Sound Click */}
          {laughToast && (
            <div className="bg-amber-900 text-amber-100 dark:bg-amber-950 dark:text-amber-200 p-4 rounded-xl text-sm sm:text-base flex items-center justify-between border border-amber-700/50 shadow-md">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-300 animate-spin shrink-0" />
                <span>
                  <strong>¡JAJAJAJA!</strong> "A visit is not a residence, papito. Arrive on time, leave before dessert becomes a mortgage."
                </span>
              </div>
              <button onClick={() => setLaughToast(false)} className="text-amber-300 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Chapter Header */}
          <header className="space-y-4 pt-2">
            {currentChapter.partTitle && (
              <div className="text-xs sm:text-sm uppercase tracking-widest text-amber-800/80 dark:text-amber-400 font-sans font-semibold">
                {currentChapter.partTitle}
              </div>
            )}

            <h1 className="text-3xl sm:text-5xl font-display font-medium text-stone-900 dark:text-stone-100 leading-tight">
              {currentChapter.title}
            </h1>

            {currentChapter.subtitle && (
              <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 italic font-reading-serif leading-relaxed">
                {currentChapter.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-sans">
              <span>{currentChapter.wordCount} words</span>
              <span aria-hidden="true">·</span>
              <span>Estimated {currentChapter.readingMinutes} min read</span>
              <span aria-hidden="true">·</span>
              <span>Characters: {currentChapter.characters.join(', ')}</span>
            </div>

            {/* Linked Companion Chapter Callout if present */}
            {currentChapter.linkedChapterId && onNavigateToLinkedChapter && (
              <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-300 font-sans">
                    <LinkIcon className="w-4 h-4" />
                    <span>Cross-Text Synchronized Companion:</span>
                  </div>
                  <div className="text-sm sm:text-base text-stone-700 dark:text-stone-300 font-reading-serif">
                    {currentChapter.linkedNote || `Paired with ${currentChapter.linkedChapterTitle}`}
                  </div>
                </div>

                <button
                  onClick={() => {
                    const targetBookId = book.id === 'book1' ? 'book2' : 'book1';
                    onNavigateToLinkedChapter(targetBookId, currentChapter.linkedChapterId!);
                  }}
                  className="px-4 py-2.5 rounded-lg bg-amber-800 text-white dark:bg-amber-500 dark:text-stone-950 text-sm font-medium hover:bg-amber-700 transition-colors shrink-0 flex items-center gap-1.5 shadow-sm min-h-[44px]"
                >
                  <span>View Case Study</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </header>

          {/* Chapter Body Sections */}
          <article className={`space-y-8 text-stone-800 dark:text-stone-200 ${fontSizeClass} ${fontClass}`}>
            {currentChapter.sections.map((section, idx) => {
              if (section.type === 'law') {
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-8 rounded-2xl bg-amber-900/5 dark:bg-amber-500/10 border border-amber-800/20 dark:border-amber-400/30 text-amber-950 dark:text-amber-200 space-y-2 text-center my-8"
                  >
                    <span className="text-xs sm:text-sm uppercase tracking-widest font-sans font-bold text-amber-800 dark:text-amber-400 block">
                      {section.heading || 'SANCHO’S LAW'}
                    </span>
                    <p className="text-2xl sm:text-3xl font-display font-semibold italic text-stone-900 dark:text-stone-100 leading-snug">
                      “{section.content}”
                    </p>
                  </div>
                );
              }

              if (section.type === 'rule') {
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-8 rounded-2xl bg-stone-900 text-stone-100 dark:bg-stone-950 dark:border dark:border-stone-800 space-y-2 text-center my-8 shadow-sm"
                  >
                    <span className="text-xs sm:text-sm uppercase tracking-widest font-sans font-bold text-amber-400 block">
                      {section.heading || 'THE BLANCO RULE'}
                    </span>
                    <p className="text-xl sm:text-2xl font-display font-medium leading-snug">
                      {section.content}
                    </p>
                  </div>
                );
              }

              if (section.type === 'reality-check') {
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 rounded-2xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-3 my-6"
                  >
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                      <span>{section.heading || 'THE REALITY CHECK: THE COST OF RESTRAINT'}</span>
                    </div>
                    <div className="space-y-4 whitespace-pre-line text-stone-700 dark:text-stone-300 leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                );
              }

              if (section.type === 'quote') {
                return (
                  <blockquote
                    key={idx}
                    className="py-6 px-4 my-8 text-2xl sm:text-3xl font-display italic text-stone-900 dark:text-stone-100 text-center border-y border-stone-200 dark:border-stone-800 leading-snug"
                  >
                    {section.content}
                  </blockquote>
                );
              }

              return (
                <div key={idx} className="space-y-4">
                  {section.heading && (
                    <h2 className="text-2xl sm:text-3xl font-display font-semibold text-stone-900 dark:text-stone-100 pt-6 border-b border-stone-200/60 dark:border-stone-800/60 pb-2">
                      {section.heading}
                    </h2>
                  )}
                  <div className="prose-drop-cap space-y-4 whitespace-pre-line leading-relaxed sm:leading-loose">
                    {section.content}
                  </div>
                </div>
              );
            })}
          </article>

          {/* Chapter Navigation Footer */}
          <footer className="pt-10 mt-12 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {prevChapter ? (
              <button
                onClick={() => {
                  soundscapes.playPageTurn();
                  onSelectChapter(prevChapter.id);
                }}
                className="flex items-center gap-2 text-sm sm:text-base text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-stone-100 font-medium transition-colors p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800/60 min-h-[48px]"
              >
                <ChevronLeft className="w-5 h-5 shrink-0" />
                <span className="truncate">
                  Prev: {prevChapter.title.replace(/^Chapter \d+:\s*/, '')}
                </span>
              </button>
            ) : <div />}

            {nextChapter && (
              <button
                onClick={() => {
                  soundscapes.playPageTurn();
                  onSelectChapter(nextChapter.id);
                }}
                className="flex items-center justify-end gap-2 text-sm sm:text-base text-amber-900 dark:text-amber-300 hover:text-amber-700 dark:hover:text-amber-200 font-medium transition-colors p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-100 dark:hover:bg-amber-950/40 min-h-[48px] sm:ml-auto"
              >
                <span className="truncate">
                  Next: {nextChapter.title.replace(/^Chapter \d+:\s*/, '')}
                </span>
                <ChevronRight className="w-5 h-5 shrink-0" />
              </button>
            )}
          </footer>
        </main>
      </div>

      {/* Mobile Drawer Table of Contents */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-start">
          <div className="w-84 max-w-[85vw] bg-[#FAF8F5] dark:bg-stone-900 h-full p-5 overflow-y-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <span className="font-display font-semibold text-stone-900 dark:text-stone-100 text-xl">
                {book.shortTitle}
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Font Size Controls */}
            {onFontSizeChange && (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                <span className="text-xs font-sans font-semibold text-stone-600 dark:text-stone-400">
                  Text Size
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleDecreaseFont}
                    disabled={currentSizeIdx === 0}
                    className="px-2.5 py-1.5 min-h-[36px] rounded bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold disabled:opacity-30 border border-stone-200 dark:border-stone-600"
                  >
                    A-
                  </button>
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300 min-w-[32px] text-center font-sans">
                    {fontSize === 'sm' ? 'Std' : fontSize === 'md' ? 'Lg' : fontSize === 'lg' ? 'XL' : 'XXL'}
                  </span>
                  <button
                    onClick={handleIncreaseFont}
                    disabled={currentSizeIdx === FONT_SIZES.length - 1}
                    className="px-2.5 py-1.5 min-h-[36px] rounded bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold disabled:opacity-30 border border-stone-200 dark:border-stone-600"
                  >
                    A+
                  </button>
                </div>
              </div>
            )}

            <nav className="space-y-1.5">
              {chapters.map(ch => {
                const active = ch.id === currentChapter.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      soundscapes.playPageTurn();
                      onSelectChapter(ch.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl text-sm sm:text-base transition-colors flex items-center justify-between min-h-[48px] ${
                      active
                        ? 'bg-amber-950/10 text-amber-950 dark:bg-amber-500/20 dark:text-amber-200 font-semibold border-l-3 border-amber-800 dark:border-amber-400'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span className="truncate">
                      {ch.chapterNumber === 0 ? 'Intro' : `Ch. ${ch.chapterNumber}`}: {ch.title.replace(/^Chapter \d+:\s*/, '')}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

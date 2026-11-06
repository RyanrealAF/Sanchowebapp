import React from 'react';
import { X, Check, Bookmark, Trash2, BookOpen } from 'lucide-react';
import { BookChapter } from '../utils/bookData';
import { soundscapes } from '../utils/ambientAudio';

export type ReaderTheme = 'amber' | 'paper' | 'midnight' | 'gallery';

interface ReaderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ReaderTheme;
  onThemeChange: (theme: ReaderTheme) => void;
  fontSize: 'sm' | 'md' | 'lg' | 'xl';
  onFontSizeChange: (size: 'sm' | 'md' | 'lg' | 'xl') => void;
  fontFamily: 'serif' | 'sans';
  onFontFamilyChange: (family: 'serif' | 'sans') => void;
  bookmarks: string[];
  allChapters: BookChapter[];
  onSelectChapter: (bookId: 'book1' | 'book2', chapterId: string) => void;
  onRemoveBookmark: (chapterId: string) => void;
}

export const ReaderSettingsModal: React.FC<ReaderSettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onThemeChange,
  fontSize,
  onFontSizeChange,
  fontFamily,
  onFontFamilyChange,
  bookmarks,
  allChapters,
  onSelectChapter,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  const bookmarkedChapters = allChapters.filter(c => bookmarks.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="space-y-0.5">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-amber-800 dark:text-amber-400">
              Reader Preferences
            </span>
            <h3 className="font-display font-semibold text-xl text-stone-900 dark:text-stone-100">
              Atmosphere & Typography
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Theme Selection */}
        <div className="space-y-3">
          <label className="text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider text-stone-500 block">
            Curated Reading Atmosphere
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* La Paloma Amber 2700K */}
            <button
              onClick={() => {
                soundscapes.playPageTurn();
                onThemeChange('amber');
              }}
              className={`p-3.5 rounded-xl border text-left space-y-1 transition-all min-h-[72px] ${
                theme === 'amber'
                  ? 'border-amber-600 bg-amber-950/15 ring-1 ring-amber-600'
                  : 'border-stone-200 dark:border-stone-700 hover:border-stone-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold font-sans text-amber-900 dark:text-amber-300">
                  La Paloma Amber
                </span>
                {theme === 'amber' && <Check className="w-4 h-4 text-amber-600" />}
              </div>
              <p className="text-xs text-stone-500 font-sans">
                2700K warm recessed glow & Spanish mahogany tone.
              </p>
            </button>

            {/* Archival Paper */}
            <button
              onClick={() => {
                soundscapes.playPageTurn();
                onThemeChange('paper');
              }}
              className={`p-3.5 rounded-xl border text-left space-y-1 transition-all min-h-[72px] ${
                theme === 'paper'
                  ? 'border-stone-800 dark:border-stone-200 bg-stone-100 dark:bg-stone-800 ring-1 ring-stone-800 dark:ring-stone-200'
                  : 'border-stone-200 dark:border-stone-700 hover:border-stone-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold font-sans text-stone-900 dark:text-stone-100">
                  Archival Paper
                </span>
                {theme === 'paper' && <Check className="w-4 h-4 text-stone-900 dark:text-stone-100" />}
              </div>
              <p className="text-xs text-stone-500 font-sans">
                Warm alabaster linen with antique charcoal ink.
              </p>
            </button>

            {/* Midnight Velvet */}
            <button
              onClick={() => {
                soundscapes.playPageTurn();
                onThemeChange('midnight');
              }}
              className={`p-3.5 rounded-xl border text-left space-y-1 transition-all min-h-[72px] ${
                theme === 'midnight'
                  ? 'border-blue-500 bg-blue-950/20 ring-1 ring-blue-500'
                  : 'border-stone-200 dark:border-stone-700 hover:border-stone-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold font-sans text-blue-900 dark:text-blue-300">
                  Midnight Velvet
                </span>
                {theme === 'midnight' && <Check className="w-4 h-4 text-blue-500" />}
              </div>
              <p className="text-xs text-stone-500 font-sans">
                Deep navy with subtle gold foil accents.
              </p>
            </button>

            {/* Gallery Stark */}
            <button
              onClick={() => {
                soundscapes.playPageTurn();
                onThemeChange('gallery');
              }}
              className={`p-3.5 rounded-xl border text-left space-y-1 transition-all min-h-[72px] ${
                theme === 'gallery'
                  ? 'border-stone-900 dark:border-white bg-stone-50 dark:bg-stone-800 ring-1 ring-stone-900 dark:ring-white'
                  : 'border-stone-200 dark:border-stone-700 hover:border-stone-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold font-sans text-stone-900 dark:text-stone-100">
                  Gallery Stark
                </span>
                {theme === 'gallery' && <Check className="w-4 h-4 text-stone-900 dark:text-stone-100" />}
              </div>
              <p className="text-xs text-stone-500 font-sans">
                High-contrast pure gallery white and deep ink.
              </p>
            </button>
          </div>
        </div>

        {/* 2. Font Size Selection */}
        <div className="space-y-3">
          <label className="text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider text-stone-500 block">
            Type Scale
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
              <button
                key={size}
                onClick={() => {
                  soundscapes.playPageTurn();
                  onFontSizeChange(size);
                }}
                className={`py-3 px-3 rounded-xl text-sm font-sans font-medium border text-center transition-colors min-h-[48px] ${
                  fontSize === size
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 border-stone-900 dark:border-stone-100 font-semibold'
                    : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-400'
                }`}
              >
                {size === 'sm' ? 'Standard' : size === 'md' ? 'Large' : size === 'lg' ? 'XL' : 'XXL'}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Font Family Selection */}
        <div className="space-y-3">
          <label className="text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider text-stone-500 block">
            Typographic Voice
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                soundscapes.playPageTurn();
                onFontFamilyChange('serif');
              }}
              className={`p-3.5 rounded-xl border text-left transition-all min-h-[72px] ${
                fontFamily === 'serif'
                  ? 'border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800 ring-1 ring-stone-900 dark:ring-stone-100'
                  : 'border-stone-200 dark:border-stone-700 text-stone-500'
              }`}
            >
              <div className="font-reading-serif font-semibold text-base text-stone-900 dark:text-stone-100">
                Editorial Serif (Lora)
              </div>
              <p className="text-xs text-stone-500 font-sans">
                Traditional literary cadence and reading comfort.
              </p>
            </button>

            <button
              onClick={() => {
                soundscapes.playPageTurn();
                onFontFamilyChange('sans');
              }}
              className={`p-3.5 rounded-xl border text-left transition-all min-h-[72px] ${
                fontFamily === 'sans'
                  ? 'border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800 ring-1 ring-stone-900 dark:ring-stone-100'
                  : 'border-stone-200 dark:border-stone-700 text-stone-500'
              }`}
            >
              <div className="font-reading-sans font-semibold text-base text-stone-900 dark:text-stone-100">
                Modern Sans (Plus Jakarta)
              </div>
              <p className="text-xs text-stone-500 font-sans">
                Crisp contemporary geometric clarity.
              </p>
            </button>
          </div>
        </div>

        {/* 4. Bookmarks Management */}
        <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Saved Bookmarks ({bookmarkedChapters.length})</span>
            </label>
          </div>

          {bookmarkedChapters.length === 0 ? (
            <p className="text-sm text-stone-400 font-reading-serif italic">
              No saved bookmarks yet. Tap the bookmark icon while reading any chapter to save your place.
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {bookmarkedChapters.map(ch => (
                <div
                  key={ch.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-800 text-sm border border-stone-200 dark:border-stone-700 min-h-[48px]"
                >
                  <button
                    onClick={() => {
                      onSelectChapter(ch.bookId, ch.id);
                      onClose();
                    }}
                    className="flex items-center gap-2.5 text-stone-800 dark:text-stone-200 hover:text-amber-700 dark:hover:text-amber-300 truncate text-left flex-1"
                  >
                    <BookOpen className="w-4 h-4 shrink-0 text-amber-600" />
                    <span className="truncate font-semibold">{ch.title}</span>
                  </button>

                  <button
                    onClick={() => onRemoveBookmark(ch.id)}
                    className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-stone-400 hover:text-rose-600 transition-colors shrink-0"
                    title="Remove bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-medium text-sm sm:text-base hover:bg-stone-800 transition-colors min-h-[48px]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

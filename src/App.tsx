import React, { useState, useEffect } from 'react';
import { TopNav, ActiveTab } from './components/TopNav';
import { BookShelf } from './components/BookShelf';
import { BookReader } from './components/BookReader';
import { ComparativeReader } from './components/ComparativeReader';
import { BlancoCodeCodex } from './components/BlancoCodeCodex';
import { FantasyAccounting } from './components/FantasyAccounting';
import { ProtocolFieldTest } from './components/ProtocolFieldTest';
import { PathologyDossier } from './components/PathologyDossier';
import { ReaderSettingsModal, ReaderTheme } from './components/ReaderSettingsModal';
import { BOOKS_INFO, BOOK_1_CHAPTERS, BOOK_2_CHAPTERS, BookChapter } from './utils/bookData';
import { soundscapes } from './utils/ambientAudio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('shelf');
  const [book1ChapterId, setBook1ChapterId] = useState<string>('b1-ch1');
  const [book2ChapterId, setBook2ChapterId] = useState<string>('b2-ch1');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ambientPlaying, setAmbientPlaying] = useState(false);

  // Reader Settings State with safe LocalStorage fallbacks
  const [theme, setTheme] = useState<ReaderTheme>(() => {
    try {
      return (localStorage.getItem('sancho_theme') as ReaderTheme) || 'amber';
    } catch {
      return 'amber';
    }
  });

  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>(() => {
    try {
      return (localStorage.getItem('sancho_fontsize') as 'sm' | 'md' | 'lg' | 'xl') || 'md';
    } catch {
      return 'md';
    }
  });

  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>(() => {
    try {
      return (localStorage.getItem('sancho_fontfamily') as 'serif' | 'sans') || 'serif';
    } catch {
      return 'serif';
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sancho_bookmarks');
      return saved ? JSON.parse(saved) : ['b1-ch1', 'b2-ch1'];
    } catch {
      return ['b1-ch1', 'b2-ch1'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sancho_theme', theme);
    } catch {
      // Storage unavailable or restricted in sandboxed iframe
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('sancho_fontsize', fontSize);
    } catch {
      // Storage unavailable or restricted in sandboxed iframe
    }
  }, [fontSize]);

  useEffect(() => {
    try {
      localStorage.setItem('sancho_fontfamily', fontFamily);
    } catch {
      // Storage unavailable or restricted in sandboxed iframe
    }
  }, [fontFamily]);

  useEffect(() => {
    try {
      localStorage.setItem('sancho_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // Storage unavailable or restricted in sandboxed iframe
    }
  }, [bookmarks]);

  // Handle ambient audio toggle
  const handleToggleAmbient = () => {
    const nextState = !ambientPlaying;
    setAmbientPlaying(nextState);
    soundscapes.toggleAmbient(nextState);
  };

  // Toggle bookmark
  const handleToggleBookmark = (chapterId: string) => {
    setBookmarks(prev =>
      prev.includes(chapterId) ? prev.filter(id => id !== chapterId) : [...prev, chapterId]
    );
  };

  const handleRemoveBookmark = (chapterId: string) => {
    setBookmarks(prev => prev.filter(id => id !== chapterId));
  };

  // Navigation handlers
  const handleSelectBook = (bookId: 'book1' | 'book2', chapterId?: string) => {
    if (bookId === 'book1') {
      if (chapterId) setBook1ChapterId(chapterId);
      setActiveTab('book1');
    } else {
      if (chapterId) setBook2ChapterId(chapterId);
      setActiveTab('book2');
    }
  };

  const allChapters: BookChapter[] = [...BOOK_1_CHAPTERS, ...BOOK_2_CHAPTERS];

  // Theme styling wrapper
  const themeClasses = {
    amber: 'bg-[#FAF7F2] text-[#292524] dark:bg-[#1C1614] dark:text-[#F5F2EB]',
    paper: 'bg-[#FDFBF7] text-[#1C1917] dark:bg-[#1A1817] dark:text-[#EDE8E1]',
    midnight: 'bg-[#F8FAFC] text-[#0F172A] dark:bg-[#0B1120] dark:text-[#F1F5F9]',
    gallery: 'bg-[#FFFFFF] text-[#0A0A0A] dark:bg-[#121212] dark:text-[#F4F4F5]',
  }[theme];

  return (
    <div className={`min-h-screen transition-colors duration-200 flex flex-col ${themeClasses}`}>
      {/* Universal Top Navigation conforming to Top Bar Contract */}
      <TopNav
        activeTab={activeTab}
        onTabChange={tab => {
          soundscapes.playPageTurn();
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSettings={() => setSettingsOpen(true)}
        ambientPlaying={ambientPlaying}
        onToggleAmbient={handleToggleAmbient}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {activeTab === 'shelf' && (
          <BookShelf
            onSelectBook={handleSelectBook}
            onOpenComparative={() => setActiveTab('comparative')}
            onOpenCompanion={tab => setActiveTab(tab)}
            savedBookmarksCount={bookmarks.length}
          />
        )}

        {activeTab === 'book1' && (
          <BookReader
            book={BOOKS_INFO.book1}
            chapters={BOOK_1_CHAPTERS}
            allChapters={allChapters}
            currentChapterId={book1ChapterId}
            onSelectChapter={id => setBook1ChapterId(id)}
            onNavigateToLinkedChapter={(bookId, chapterId) => {
              if (bookId === 'book2') {
                setBook2ChapterId(chapterId);
                setActiveTab('book2');
              } else {
                setBook1ChapterId(chapterId);
                setActiveTab('book1');
              }
            }}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
            fontFamily={fontFamily}
          />
        )}

        {activeTab === 'book2' && (
          <BookReader
            book={BOOKS_INFO.book2}
            chapters={BOOK_2_CHAPTERS}
            allChapters={allChapters}
            currentChapterId={book2ChapterId}
            onSelectChapter={id => setBook2ChapterId(id)}
            onNavigateToLinkedChapter={(bookId, chapterId) => {
              if (bookId === 'book1') {
                setBook1ChapterId(chapterId);
                setActiveTab('book1');
              } else {
                setBook2ChapterId(chapterId);
                setActiveTab('book2');
              }
            }}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
            fontFamily={fontFamily}
          />
        )}

        {activeTab === 'comparative' && (
          <ComparativeReader
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
            fontFamily={fontFamily}
          />
        )}

        {activeTab === 'code' && (
          <BlancoCodeCodex
            onJumpToNovellaChapter={chId => {
              setBook2ChapterId(chId);
              setActiveTab('book2');
            }}
          />
        )}

        {activeTab === 'accounting' && <FantasyAccounting />}

        {activeTab === 'dossier' && <PathologyDossier />}

        {activeTab === 'test' && <ProtocolFieldTest />}
      </div>

      {/* Reader Settings Modal */}
      <ReaderSettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        onThemeChange={setTheme}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        fontFamily={fontFamily}
        onFontFamilyChange={setFontFamily}
        bookmarks={bookmarks}
        allChapters={allChapters}
        onSelectChapter={(bookId, chapterId) => {
          handleSelectBook(bookId, chapterId);
          setSettingsOpen(false);
        }}
        onRemoveBookmark={handleRemoveBookmark}
      />

      {/* Elegant Editorial Footer */}
      <footer className="mt-16 border-t border-stone-200 dark:border-stone-800 py-10 px-4 sm:px-6 text-center text-xs sm:text-sm text-stone-500 space-y-2.5">
        <p className="font-display italic text-base sm:text-lg text-stone-700 dark:text-stone-300">
          “The king has the throne. The queen has the vote. And you, caballero, have a reservation.”
        </p>
        <p className="font-sans text-xs sm:text-sm text-stone-400 dark:text-stone-500">
          The Señor Sancho Blanco Project · Satirical Manual & Narrative Novella · Curated Edition
        </p>
      </footer>
    </div>
  );
}

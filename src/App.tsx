import React, { useState, useEffect } from 'react';
import { TopNav, ActiveTab } from './components/TopNav';
import { BookShelf } from './components/BookShelf';
import { BookReader } from './components/BookReader';
import { ComparativeReader } from './components/ComparativeReader';
import { ReaderSettingsModal, ReaderTheme } from './components/ReaderSettingsModal';
import { BOOKS_INFO, BOOK_1_CHAPTERS, BOOK_2_CHAPTERS, BookChapter } from './utils/bookData';
import { soundscapes } from './utils/ambientAudio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('shelf');
  const [book1ChapterId, setBook1ChapterId] = useState('b1-prologue');
  const [book2ChapterId, setBook2ChapterId] = useState('b2-ch1');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ambientPlaying, setAmbientPlaying] = useState(false);

  const [theme, setTheme] = useState<ReaderTheme>(() => {
    try { return (localStorage.getItem('sancho_theme') as ReaderTheme) || 'amber'; }
    catch { return 'amber'; }
  });
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>(() => {
    try { return (localStorage.getItem('sancho_fontsize') as 'sm' | 'md' | 'lg' | 'xl') || 'md'; }
    catch { return 'md'; }
  });
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>(() => {
    try { return (localStorage.getItem('sancho_fontfamily') as 'serif' | 'sans') || 'serif'; }
    catch { return 'serif'; }
  });
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sancho_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem('sancho_theme', theme); } catch {}
  }, [theme]);
  useEffect(() => {
    try { localStorage.setItem('sancho_fontsize', fontSize); } catch {}
  }, [fontSize]);
  useEffect(() => {
    try { localStorage.setItem('sancho_fontfamily', fontFamily); } catch {}
  }, [fontFamily]);
  useEffect(() => {
    try { localStorage.setItem('sancho_bookmarks', JSON.stringify(bookmarks)); } catch {}
  }, [bookmarks]);

  const allChapters: BookChapter[] = [...BOOK_1_CHAPTERS, ...BOOK_2_CHAPTERS];

  const handleSelectBook = (bookId: 'book1' | 'book2', chapterId?: string) => {
    if (bookId === 'book1') {
      if (chapterId) setBook1ChapterId(chapterId);
      setActiveTab('book1');
    } else {
      if (chapterId) setBook2ChapterId(chapterId);
      setActiveTab('book2');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (chapterId: string) => {
    setBookmarks(current => current.includes(chapterId)
      ? current.filter(id => id !== chapterId)
      : [...current, chapterId]);
  };

  const handleToggleAmbient = () => {
    const next = !ambientPlaying;
    setAmbientPlaying(next);
    soundscapes.toggleAmbient(next);
  };

  const themeClasses = {
    amber: 'bg-[#FAF7F2] text-[#292524] dark:bg-[#171513] dark:text-[#F5F0E8]',
    paper: 'bg-[#FDFBF7] text-[#1C1917] dark:bg-[#191614] dark:text-[#EDE8E1]',
    midnight: 'bg-[#F8FAFC] text-[#0F172A] dark:bg-[#10131B] dark:text-[#F1F5F9]',
    gallery: 'bg-[#FFFFFF] text-[#0A0A0A] dark:bg-[#151313] dark:text-[#F4F4F5]',
  }[theme];

  return (
    <div className={`dark min-h-screen flex flex-col transition-colors duration-200 ${themeClasses}`}>
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

      <main className="flex-1">
        {activeTab === 'shelf' && (
          <BookShelf
            onSelectBook={handleSelectBook}
            onOpenComparative={() => setActiveTab('comparative')}
            savedBookmarksCount={bookmarks.length}
          />
        )}

        {activeTab === 'book1' && (
          <BookReader
            book={BOOKS_INFO.book1}
            chapters={BOOK_1_CHAPTERS}
            allChapters={allChapters}
            currentChapterId={book1ChapterId}
            onSelectChapter={setBook1ChapterId}
            onNavigateToLinkedChapter={(bookId, chapterId) => handleSelectBook(bookId, chapterId)}
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
            onSelectChapter={setBook2ChapterId}
            onNavigateToLinkedChapter={(bookId, chapterId) => handleSelectBook(bookId, chapterId)}
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
      </main>

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
        onRemoveBookmark={id => setBookmarks(current => current.filter(item => item !== id))}
      />

      <footer className="mt-16 border-t border-[#5B4937]/50 bg-[#171311] px-4 py-10 text-center space-y-3">
        <p className="font-display italic text-xl sm:text-2xl text-[#D7B77E]">
          “The King has the throne. The Queen has the vote. And you, caballero, have a reservation.”
        </p>
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-stone-500">
          The Señor Sancho Blanco Project · A Guide to Being the Perfect Other Guy
        </p>
      </footer>
    </div>
  );
}

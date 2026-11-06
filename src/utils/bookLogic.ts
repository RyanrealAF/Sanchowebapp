export interface ChapterSearchResult {
  bookId: 'book1' | 'book2';
  bookTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  matchSnippet: string;
}

export function calculateReadingTime(wordCount: number, wordsPerMinute: number = 220): number {
  if (wordCount <= 0) return 1;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

export function searchInChapters(
  query: string,
  chapters: Array<{
    id: string;
    chapterNumber: number;
    title: string;
    content?: string;
    sections?: Array<{ content: string }>;
    bookId: 'book1' | 'book2';
    bookTitle: string;
  }>
): ChapterSearchResult[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const results: ChapterSearchResult[] = [];

  for (const ch of chapters) {
    const rawContent = ch.content || (ch.sections ? ch.sections.map(s => s.content).join(' ') : '');
    const textLower = rawContent.toLowerCase();
    const titleLower = ch.title.toLowerCase();

    let matchIndex = textLower.indexOf(trimmed);
    if (matchIndex === -1 && titleLower.includes(trimmed)) {
      matchIndex = 0;
    }

    if (matchIndex !== -1) {
      const start = Math.max(0, matchIndex - 60);
      const end = Math.min(rawContent.length, matchIndex + trimmed.length + 80);
      const snippet = '...' + rawContent.slice(start, end).replace(/\s+/g, ' ') + '...';

      results.push({
        bookId: ch.bookId,
        bookTitle: ch.bookTitle,
        chapterNumber: ch.chapterNumber,
        chapterTitle: ch.title,
        matchSnippet: snippet,
      });

      if (results.length >= 12) break;
    }
  }

  return results;
}

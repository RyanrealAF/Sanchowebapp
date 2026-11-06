import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateReadingTime, searchInChapters } from './bookLogic';

test('calculateReadingTime correctly estimates reading minutes', () => {
  assert.equal(calculateReadingTime(0), 1);
  assert.equal(calculateReadingTime(220), 1);
  assert.equal(calculateReadingTime(440), 2);
  assert.equal(calculateReadingTime(1100), 5);
});

test('searchInChapters finds matching text in chapters', () => {
  const testChapters = [
    {
      id: 'ch1',
      bookId: 'book1' as const,
      bookTitle: 'The Satirical Manual',
      chapterNumber: 1,
      title: 'The King, the Queen, and the Idiot With a Reservation',
      content: 'Daniel Mercer owns a label maker and uses it with love.',
    },
    {
      id: 'ch2',
      bookId: 'book2' as const,
      bookTitle: 'The Legend and the Lesson',
      chapterNumber: 1,
      title: 'The Quiet Corner at La Paloma',
      content: 'Elena asked for the table under the copper lantern.',
    },
  ];

  const searchLabel = searchInChapters('label maker', testChapters);
  assert.equal(searchLabel.length, 1);
  assert.equal(searchLabel[0].chapterNumber, 1);
  assert.match(searchLabel[0].matchSnippet, /label maker/);

  const searchCopper = searchInChapters('copper lantern', testChapters);
  assert.equal(searchCopper.length, 1);
  assert.equal(searchCopper[0].bookId, 'book2');
});

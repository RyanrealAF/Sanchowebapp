import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateReadingTime,
  calculateEmotionalOverhead,
  evaluateProtocolChoice,
  searchInChapters,
  type LedgerItem,
} from './bookLogic';

test('calculateReadingTime correctly estimates reading minutes', () => {
  assert.equal(calculateReadingTime(0), 1);
  assert.equal(calculateReadingTime(220), 1);
  assert.equal(calculateReadingTime(440), 2);
  assert.equal(calculateReadingTime(1100), 5);
});

test('calculateEmotionalOverhead calculates sums and subsidy ratios', () => {
  const dummyItems: LedgerItem[] = [
    { id: 's1', title: 'Amber Ambiance', category: 'sancho', costWeight: 10, description: '2700K lighting' },
    { id: 's2', title: 'Wine & Flan', category: 'sancho', costWeight: 15, description: 'La Paloma' },
    { id: 'd1', title: 'Mortgage & Taxes', category: 'daniel', costWeight: 50, description: 'Primary deed' },
    { id: 'd2', title: 'Radiator at 2 AM', category: 'daniel', costWeight: 40, description: 'Plumbing repair' },
  ];

  const result = calculateEmotionalOverhead(['s1', 's2'], ['d1', 'd2'], dummyItems);
  assert.equal(result.sanchoTotal, 25);
  assert.equal(result.danielTotal, 90);
  assert.equal(result.subsidyRatio, 3.6);
  assert.match(result.verdict, /Heavy Domestic Load-Bearing/);
});

test('evaluateProtocolChoice returns accurate Blanco Code evaluations', () => {
  const correctChoice = evaluateProtocolChoice('burnt-sauce', 'A');
  assert.equal(correctChoice.isBlancoCode, true);
  assert.equal(correctChoice.score, 10);
  assert.equal(correctChoice.verdictTitle, 'The Blanco Code Master');

  const comparisonTrap = evaluateProtocolChoice('burnt-sauce', 'B');
  assert.equal(comparisonTrap.isBlancoCode, false);
  assert.equal(comparisonTrap.score, 0);

  const squatterChoice = evaluateProtocolChoice('burnt-sauce', 'C');
  assert.equal(squatterChoice.isBlancoCode, false);
  assert.equal(squatterChoice.score, -5);
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

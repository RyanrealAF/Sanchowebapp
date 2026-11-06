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

export interface LedgerItem {
  id: string;
  title: string;
  category: 'sancho' | 'daniel';
  costWeight: number; // emotional weight / labor points
  description: string;
}

export interface OverheadResult {
  sanchoTotal: number;
  danielTotal: number;
  subsidyRatio: number;
  verdict: string;
}

export function calculateEmotionalOverhead(
  sanchoActiveItemIds: string[],
  danielActiveItemIds: string[],
  allLedgerItems: LedgerItem[]
): OverheadResult {
  const itemMap = new Map(allLedgerItems.map(item => [item.id, item]));

  const sanchoTotal = sanchoActiveItemIds.reduce((sum, id) => {
    const item = itemMap.get(id);
    return sum + (item && item.category === 'sancho' ? item.costWeight : 0);
  }, 0);

  const danielTotal = danielActiveItemIds.reduce((sum, id) => {
    const item = itemMap.get(id);
    return sum + (item && item.category === 'daniel' ? item.costWeight : 0);
  }, 0);

  // Ratio of domestic labor subsidizing boutique transience
  const subsidyRatio = sanchoTotal > 0 ? Number((danielTotal / sanchoTotal).toFixed(2)) : 0;

  let verdict = '';
  if (danielTotal >= 80) {
    verdict = 'Heavy Domestic Load-Bearing: Daniel carries full structural plumbing, mortgage, and emotional mortgage. Sancho extracts pristine 2700K zero-liability dividends.';
  } else if (danielTotal >= 40) {
    verdict = 'Moderate Domestic Foundation: Significant household labor and history subsidizing the boutique appointments.';
  } else {
    verdict = 'Low Household Overhead: Minimal domestic maintenance recorded, though still subsidizing the visitor.';
  }

  return {
    sanchoTotal,
    danielTotal,
    subsidyRatio,
    verdict,
  };
}

export interface ProtocolEvaluation {
  isBlancoCode: boolean;
  score: number;
  lawReferenced: string;
  feedback: string;
  verdictTitle: string;
}

export function evaluateProtocolChoice(
  scenarioId: string,
  selectedChoiceKey: 'A' | 'B' | 'C'
): ProtocolEvaluation {
  const evaluations: Record<string, Record<'A' | 'B' | 'C', ProtocolEvaluation>> = {
    'burnt-sauce': {
      A: {
        isBlancoCode: true,
        score: 10,
        lawReferenced: 'Law V: Give the Husband Credit & Fragile Ego Protection Program',
        feedback: 'Impeccable discipline. You laughed at the situation, defended Daniel taking the risk to cook, and praised a "smoky finish" as a confident lie in a crisis.',
        verdictTitle: 'The Blanco Code Master',
      },
      B: {
        isBlancoCode: false,
        score: 0,
        lawReferenced: 'Violation: The Comparison Trap',
        feedback: 'You grabbed the easy laugh. You made the husband a stepping stone to look tall. Elena noticed you need an enemy to shine.',
        verdictTitle: 'Amateur Other Guy',
      },
      C: {
        isBlancoCode: false,
        score: -5,
        lawReferenced: 'Violation: Rico Royale Invasive Squatting',
        feedback: 'You weaponized Daniel’s failure to audition for his permanent role in the kitchen. Squatter behavior with cologne.',
        verdictTitle: 'The Corporate Raider',
      },
    },
    'marquee-squall': {
      A: {
        isBlancoCode: true,
        score: 10,
        lawReferenced: 'Law I: Never Humiliate the Husband',
        feedback: 'You handed your suede jacket to Tasha, held the wet diagonal pole, guided the pin home, and gave Daniel full credit for the structure.',
        verdictTitle: 'The Conscientious Guest',
      },
      B: {
        isBlancoCode: false,
        score: 0,
        lawReferenced: 'Violation: Passive Bystander / Cowardice',
        feedback: 'You stayed dry while Daniel struggled alone. Safe, but devoid of the quiet solidarity that preserves human dignity.',
        verdictTitle: 'The Detached Spectator',
      },
      C: {
        isBlancoCode: false,
        score: -5,
        lawReferenced: 'Violation: The Public Piñata Whack',
        feedback: 'You joined Rico in mocking Daniel’s engineering degree in front of gala attendees. The King’s ego is not a piñata.',
        verdictTitle: 'Rico Royale Imitator',
      },
    },
    'cleared-field': {
      A: {
        isBlancoCode: true,
        score: 10,
        lawReferenced: 'Law VII: Know When to Leave & Law II: No Coercion',
        feedback: 'You refused the trap. You declared: "I am a guest, not a thief. I do not take keys from a man who thinks he is handing them to a brother." You called Elena and paused the appointment.',
        verdictTitle: 'High Protocol Preserved',
      },
      B: {
        isBlancoCode: false,
        score: -10,
        lawReferenced: 'Violation: Catastrophic Treachery',
        feedback: 'You took the weekend bait. Rico caught you, exposed the house, and left both spouses shattered while stepping in as the comforting savior.',
        verdictTitle: 'Disaster at the Lake House',
      },
      C: {
        isBlancoCode: false,
        score: 2,
        lawReferenced: 'Violation: Half-Hearted Evasion',
        feedback: 'You made an excuse to Rico but did not warn Elena about the Nashville lie. The bomb was still ticking.',
        verdictTitle: 'Unspoken Complicity',
      },
    },
  };

  const scenario = evaluations[scenarioId];
  if (!scenario || !scenario[selectedChoiceKey]) {
    return {
      isBlancoCode: false,
      score: 0,
      lawReferenced: 'General Protocol',
      feedback: 'Choice evaluated.',
      verdictTitle: 'Observation',
    };
  }

  return scenario[selectedChoiceKey];
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

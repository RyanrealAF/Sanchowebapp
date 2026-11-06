export interface BlancoLaw {
  id: string;
  number: string;
  title: string;
  mandate: string;
  theoreticalPurpose: string;
  operationalMechanism: string;
  psychologicalFunction: string;
  tashaCritique: string;
  associatedNovellaChapter: string;
}

export const BLANCO_LAWS: BlancoLaw[] = [
  {
    id: 'law-1',
    number: 'Law I',
    title: 'Never Humiliate the Husband',
    mandate: 'Refuse to turn the husband’s vulnerabilities, physical traits, or private errors into public entertainment.',
    theoreticalPurpose: 'Containment of domestic fallout and avoidance of active retaliation.',
    operationalMechanism: 'Never correct in public; admire his systems; applaud his effort; redirect rather than rescue.',
    psychologicalFunction: 'Prevents the husband from entering defensive, aggressive warfare and keeps the social room stable.',
    tashaCritique: 'Sancho claims this is chivalry. In truth, he knows if he weakens the husband, the domestic roof collapses on him too.',
    associatedNovellaChapter: 'Chapter 3: The Fragile Ego Protection Program',
  },
  {
    id: 'law-2',
    number: 'Law II',
    title: 'No Coercion, Under Any Disguise',
    mandate: 'Eliminate pressure disguised as charm; consent is never treated as a loophole to be engineered.',
    theoreticalPurpose: 'Maintenance of pure guest status; voluntary attendance only.',
    operationalMechanism: 'Check, don’t assume. An invitation is not an entitlement.',
    psychologicalFunction: 'Insulates the visitor from moral debt and manipulative entanglement.',
    tashaCritique: 'It sounds noble until you realize it also allows him to pack his bags the second things require real emotional compromise.',
    associatedNovellaChapter: 'Chapter 6: The Cleared Field',
  },
  {
    id: 'law-3',
    number: 'Law III',
    title: 'Never Promise What You Cannot Deliver',
    mandate: 'Ban guaranteed secrecy, eternal devotion, or rescue fantasies that cannot withstand real-world logistics.',
    theoreticalPurpose: 'Risk containment and truth in advertising.',
    operationalMechanism: 'Offer an evening, never a future. Keep the appointment bounded.',
    psychologicalFunction: 'Prevents the arrangement from collapsing under false expectations.',
    tashaCritique: 'He sells an honest trailer and refuses to screen the full movie.',
    associatedNovellaChapter: 'Chapter 7: Discretion Is Not a Personality',
  },
  {
    id: 'law-4',
    number: 'Law IV',
    title: 'Never Compete for the Crown',
    mandate: 'Reject all invitations to audition for the husband’s permanent role when praised by the wife.',
    theoreticalPurpose: 'Liability insulation and avoiding domestic overhead.',
    operationalMechanism: 'Explicit refusal to handle domestic chores, bills, or home repairs.',
    psychologicalFunction: 'Keeps the interloper free from permanent domestic overhead.',
    tashaCritique: 'Sancho looks terrible in permanent responsibility, and he knows it.',
    associatedNovellaChapter: 'Chapter 1: The Quiet Corner at La Paloma',
  },
  {
    id: 'law-5',
    number: 'Law V',
    title: 'Give the Husband Credit',
    mandate: 'Acknowledge the husband’s practical competence, historical labor, and genuine contributions.',
    theoreticalPurpose: 'Grounding the wife’s temporary relief in long-term reality.',
    operationalMechanism: 'Validate Daniel’s socket wrenches, his grill mastery, and his restaurant recommendations.',
    psychologicalFunction: 'Neutralizes the comparison trap and protects the husband’s standing.',
    tashaCritique: 'Giving Daniel credit costs Sancho nothing and buys him permission to remain charming.',
    associatedNovellaChapter: 'Chapter 1 & 2: The Socket Wrenches & The Burnt Sauce',
  },
  {
    id: 'law-6',
    number: 'Law VI',
    title: 'Access Is Not Ownership',
    mandate: 'Recognize that temporary spatial access does not grant voting rights over the wife’s decisions.',
    theoreticalPurpose: 'Preservation of clear operational boundaries.',
    operationalMechanism: 'Take your jacket with you; never claim a drawer, hook, or toothbrush.',
    psychologicalFunction: 'Prevents the visitor from mutating into an uninvited squatter.',
    tashaCritique: 'A visit is not a residence—the cleanest sentence in the manual, and the one Sancho clings to when things get heavy.',
    associatedNovellaChapter: 'Chapter 3: A Visit Is Not a Residence',
  },
  {
    id: 'law-7',
    number: 'Law VII',
    title: 'Know When to Leave',
    mandate: 'Step back immediately when staying requires participating in an active campaign to displace the husband.',
    theoreticalPurpose: 'Preemptive risk elimination and clean termination.',
    operationalMechanism: 'Departing immediately upon signal or completion of the appointment.',
    psychologicalFunction: 'Preserves guest dignity and avoids messy lingering confrontations.',
    tashaCritique: 'Walking away before the bill arrives is both his finest discipline and his greatest escape.',
    associatedNovellaChapter: 'Chapter 6 & 8: The Cleared Field & The Tavern Summons',
  },
];

export interface CharacterProfile {
  id: string;
  name: string;
  role: string;
  archetype: string;
  age: number;
  signatureObject: string;
  ecologicalModel: string;
  strengths: string[];
  fatalFlaws: string[];
  keyQuote: string;
  analysis: string;
}

export const CHARACTER_PROFILES: CharacterProfile[] = [
  {
    id: 'sancho',
    name: 'Señor Sancho Blanco',
    role: 'The Other Guy / Unqualified Instructor',
    archetype: 'The Boutique Tourist & Specialized Parasite',
    age: 41,
    signatureObject: 'Unconstructed suede blazer & copper lantern lighting',
    ecologicalModel: 'Specialized Parasite: Requires the host marriage to stay structurally intact to extract emotional dividends from the margins.',
    strengths: ['Flawless conversational timing', 'Strict spatial containment', 'Refusal to humiliate the husband', 'Deep understanding of human absurdity'],
    fatalFlaws: ['Terror of indispensable domestic weight', 'Fantasy accounting', 'Evasion of unglamorous emotional labor'],
    keyQuote: '“A visit is not a residence, papito. The king has the throne, the queen has the vote, and you, caballero, have a reservation.”',
    analysis: 'Sancho intellectualizes his emotional cowardice into high administrative protocol. While his self-imposed code prevents chaotic devastation, his restraint is fundamentally rooted in self-preservation.',
  },
  {
    id: 'rico',
    name: 'Rico Royale',
    role: 'The Best Friend / Opportunistic Competitor',
    archetype: 'The Hostile Corporate Raider & Invasive Species',
    age: 44,
    signatureObject: 'Spare brass key, Cabernet flute & briefcase of scotch',
    ecologicalModel: 'Invasive Species: Weaponizes 20 years of unmonitored access to systematically displace native roots and execute a full household takeover.',
    strengths: ['Charismatic networking', 'Commercial real estate acumen', 'Weaponized familiarity', 'Opportunistic timing'],
    fatalFlaws: ['Narcissistic entitlement', 'Covert contempt for Daniel', 'Disregard for Elena’s real agency', 'Underestimation of the King'],
    keyQuote: '“Daniel loves a process. Man has incredible focus when he wants to avoid a crowded room... Someone has to step up.”',
    analysis: 'Rico treats his friendship as a discounted corporate option to acquire Daniel’s assets without paying for the mortgage. His downfall comes from overplaying his hand in Chapter 6 and 7.',
  },
  {
    id: 'daniel',
    name: 'Daniel Mercer',
    role: 'The King / Primary Husband',
    archetype: 'Load-Bearing Infrastructure & Structural Utility',
    age: 43,
    signatureObject: 'Label maker, socket wrenches & ratchet tension strap',
    ecologicalModel: 'The Keystone Species: Carries the mortgage, physical repairs, and long-term domestic history that holds the entire ecosystem upright.',
    strengths: ['Unshakeable mechanical competence', 'Quiet dignity under pressure', 'Clear boundaries without melodrama', 'Thoughtful quiet gestures (remembering Elena hates birthday singing)'],
    fatalFlaws: ['Assumes practical responsibility is identical to emotional affection', 'Difficulty communicating vulnerability on ordinary Tuesdays'],
    keyQuote: '“Give me the key... Get out of my house.”',
    analysis: 'Daniel is the emotional spine of the story. Far from an unfeeling buffoon, he is an honorable, methodical man whose courage and dignity restore the household when tested.',
  },
  {
    id: 'elena',
    name: 'Elena Mercer',
    role: 'The Queen / Governing Authority',
    archetype: 'The Exhausted Event Producer & Sole Decision-Maker',
    age: 40,
    signatureObject: 'Clipboard, dark green silk blouse & cream cardstock note',
    ecologicalModel: 'The Governing Authority: Holds the calendar, votes, and ultimate moral agency over who enters her life.',
    strengths: ['Superb logistical mastery', 'Uncompromising self-determination', 'Refuses to be moved like a piece on a chessboard', 'Sharp eye for pretension'],
    fatalFlaws: ['Vulnerability to transient escapism during seasons of unconsidered exhaustion'],
    keyQuote: '“Don’t tell me what to do with this, Sancho. I need to say this myself, or it isn’t a decision, it’s just another man moving me around a board.”',
    analysis: 'Elena’s agency drives the novella’s resolution. She sees through both Rico’s predatory maneuver and Sancho’s polished transience, autonomously pausing the appointments to confront her marriage directly.',
  },
  {
    id: 'tasha',
    name: 'Tasha Green',
    role: 'Elena’s Confidante & Event Producer',
    archetype: 'The Unfooled Analytical Witness & Foreword Author',
    age: 42,
    signatureObject: 'Pink drink, acute gaze & unfiltered truth',
    ecologicalModel: 'The External Auditor: Holds up the mirror to Sancho’s self-serving rationalizations and punctures male posturing.',
    strengths: ['Surgical psychological clarity', 'Zero tolerance for male melodrama', 'Unwavering loyalty to Elena’s dignity'],
    fatalFlaws: ['Occasionally too cynical about human redemption'],
    keyQuote: '“Keeping things uncomplicated isn’t a noble philosophy. It’s simply the cheapest way to stay charming and free.”',
    analysis: 'Tasha is the critical counterweight that elevates the project into literature. Her foreword and parking lot critiques prevent Sancho’s self-mythologizing from escaping scrutiny.',
  },
];


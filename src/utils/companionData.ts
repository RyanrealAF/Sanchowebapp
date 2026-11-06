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

export interface LedgerEntry {
  id: string;
  title: string;
  category: 'sancho' | 'daniel';
  costWeight: number;
  description: string;
  iconName: string;
  active: boolean;
}

export const INITIAL_LEDGER_ITEMS: LedgerEntry[] = [
  // Sancho's Ledger (Boutique Tourism - Low Liability)
  {
    id: 's-amber',
    title: 'Curated 2700K Amber Ambiance',
    category: 'sancho',
    costWeight: 8,
    description: 'Securing the quiet corner table under the copper lantern at La Paloma.',
    iconName: 'Sparkles',
    active: true,
  },
  {
    id: 's-wine',
    title: 'Vintage Spanish Rioja & Short Rib',
    category: 'sancho',
    costWeight: 12,
    description: 'Ordering the lamb, sharing the beef, and tipping 25% cash before dessert.',
    iconName: 'Wine',
    active: true,
  },
  {
    id: 's-wit',
    title: '90-Second Conversational Witty Banter',
    category: 'sancho',
    costWeight: 10,
    description: 'Turning mundane client gripes into a witty, unscripted comedy set.',
    iconName: 'Smile',
    active: true,
  },
  {
    id: 's-zero-maint',
    title: 'Zero Housekeeping Liability',
    category: 'sancho',
    costWeight: 5,
    description: 'Carrying the suede jacket home; leaving no toothbrush, mug, or physical trace.',
    iconName: 'Shield',
    active: true,
  },
  {
    id: 's-exit',
    title: 'Punctual & Tasteful Exit',
    category: 'sancho',
    costWeight: 7,
    description: 'Walking out into the cool autumn night before the recycling is discussed.',
    iconName: 'LogOut',
    active: true,
  },

  // Daniel's Ledger (Domestic Mortgage - Heavy Overhead)
  {
    id: 'd-mortgage',
    title: '30-Year Mortgage & Property Taxes',
    category: 'daniel',
    costWeight: 45,
    description: 'Holding the legal deed, paying monthly amortization, and maintaining the roof.',
    iconName: 'Home',
    active: true,
  },
  {
    id: 'd-radiator',
    title: 'Radiator Valve at 2:00 AM',
    category: 'daniel',
    costWeight: 30,
    description: 'Metric and imperial socket wrenches organized to fix frozen heating pipes in January.',
    iconName: 'Wrench',
    active: true,
  },
  {
    id: 'd-label',
    title: 'Label Maker & Infrastructure Upkeep',
    category: 'daniel',
    costWeight: 20,
    description: 'Systematically cataloging pantry bins, garage breakers, and cords.',
    iconName: 'Tag',
    active: true,
  },
  {
    id: 'd-family-chat',
    title: 'Extended Family Group Chat Management',
    category: 'daniel',
    costWeight: 25,
    description: 'Sixteen relatives, Evelyn’s surveillance photos, and awkward birthday logistics.',
    iconName: 'MessageSquare',
    active: true,
  },
  {
    id: 'd-flu-season',
    title: 'Flu Seasons & Unedited Tuesdays',
    category: 'daniel',
    costWeight: 35,
    description: 'Emergency room visits, pharmacy runs, broken dishwashers, and marital fatigue.',
    iconName: 'HeartPulse',
    active: true,
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

export interface ScenarioChoice {
  key: 'A' | 'B' | 'C';
  text: string;
  typeLabel: 'The Blanco Code' | 'Amateur Trap' | 'Squatter Move';
}

export interface ScenarioItem {
  id: string;
  title: string;
  location: string;
  situation: string;
  context: string;
  choices: ScenarioChoice[];
}

export const PROTOCOL_SCENARIOS: ScenarioItem[] = [
  {
    id: 'burnt-sauce',
    title: 'The Burnt Sauce Dilemma',
    location: 'La Paloma — Quiet Corner under the Copper Lantern',
    situation: 'Elena tells you that Daniel decided to cook dinner, set off the smoke alarm, burned the sauce, and tried to rebrand it as a deliberate "smoky finish". She is laughing and practically serving you the joke on a silver platter.',
    context: 'The microphone is warm. All you have to do is say: "Well, you know who would never serve you a smoky finish..."',
    choices: [
      {
        key: 'A',
        text: 'Laugh at the humor of the situation itself, applaud Daniel for taking the risk to cook, call "smoky finish" a confident lie in a crisis, and redirect to dessert.',
        typeLabel: 'The Blanco Code',
      },
      {
        key: 'B',
        text: 'Drop the sharp pre-rehearsed punchline mocking husbands who schedule spontaneity and burn reductions, scoring the room-winning laugh.',
        typeLabel: 'Amateur Trap',
      },
      {
        key: 'C',
        text: 'Offer to come over on Sunday to cook a proper French reduction for her, demonstrating what real culinary competence looks like.',
        typeLabel: 'Squatter Move',
      },
    ],
  },
  {
    id: 'marquee-squall',
    title: 'The Botanical Garden Squall',
    location: 'Atlanta Botanical Gardens — Chamber of Commerce Gala',
    situation: 'A 40-mph squall threatens to collapse the high-peaked canvas tent. Daniel is drenching in the downpour, struggling with the central tension pin. Rico stands safely under a dry overhang mocking Daniel’s engineering degree.',
    context: 'What is the gentleman’s protocol when the King is physically losing a fight to four-point outdoor nylon?',
    choices: [
      {
        key: 'A',
        text: 'Hand your suede jacket to Tasha, step into the driving rain, grab the wet steel frame, guide the pin home, and ensure Daniel gets full credit.',
        typeLabel: 'The Blanco Code',
      },
      {
        key: 'B',
        text: 'Stay under the dry patio overhang sipping champagne, chuckling with guests while Daniel handles his own operational mess.',
        typeLabel: 'Amateur Trap',
      },
      {
        key: 'C',
        text: 'Loudly offer to call a private contractor from your phone, proving to Elena that Daniel lacks commercial resources.',
        typeLabel: 'Squatter Move',
      },
    ],
  },
  {
    id: 'cleared-field',
    title: 'The Cleared Field Trap',
    location: 'Friday Afternoon Phone Call — Rico Royale',
    situation: 'Rico calls you claiming Daniel is stuck at a retreat in Nashville until Monday, while telling you Daniel is actually at the lake house. Rico offers you an empty house and a free weekend to take Elena away.',
    context: 'A cleared field is presented to you with a bow. What does Law VII and Law II demand?',
    choices: [
      {
        key: 'A',
        text: 'Reject Rico’s offer immediately: "I am a guest, not a thief." Call Elena immediately to expose Rico’s lie, and pause the appointment.',
        typeLabel: 'The Blanco Code',
      },
      {
        key: 'B',
        text: 'Book a luxury mountain cabin with Elena for the weekend, assuming what the King doesn’t know won’t hurt him.',
        typeLabel: 'Amateur Trap',
      },
      {
        key: 'C',
        text: 'Decline the trip yourself, but say nothing to Elena, letting Rico’s trap remain primed in the family home.',
        typeLabel: 'Squatter Move',
      },
    ],
  },
];

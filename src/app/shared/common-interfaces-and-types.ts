



export const TREASURES_IN_ORDER = [ 'cp', 'sp', 'ep', 'gp', 'pp' ];


export interface Treasures {
  cp: number;
  sp: number;
  ep: number;
  gp: number;
  pp: number;
}

export type Treasure = 'cp' | 'sp' | 'ep' | 'gp' | 'pp';

export interface EquipmentItem {
  name: string;
  description: string;
  quantity?: number;
}



export type DieNumber = 4 | 6 | 8 | 10 | 12 | 20;

export interface HitDie {
  die: DieNumber;
  max: number;
  available: number;
}






export interface CollectedDice {
  usedDice: DieNumber[];
  availableDice: DieNumber[];
  totalDice: number;
}








export type Size =
  | 'fine'
  | 'diminutive'
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'huge'
  | 'gargantuan'
  | 'colossal'
  | 'colossal+';


export interface Cost {
  denomination: Treasure;
  quantity: number;
}



export interface Time {
  quantity?: number;
  denomination: TimeUnit;
}

export type TimeUnit =
  | 'action'
  | 'reaction'
  | 'bonus action'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'
  | 'instantaneous';


export interface LanguageScript {
  language: SpokenLanguage;
  script: WrittenScript;
}

export type SpokenLanguage =
  | 'abyssal'
  | 'aquan'
  | 'auran'
  | 'celestial'
  | 'common'
  | 'deepSpeech'
  | 'draconic'
  | 'druidic'
  | 'dwarvish'
  | 'elvish'
  | 'giant'
  | 'gnomish'
  | 'goblin'
  | 'gnoll'
  | 'halfling'
  | 'ignan'
  | 'infernal'
  | 'orc'
  | 'primordial'
  | 'sylvan'
  | 'terran'
  | 'undercommonn';

export type WrittenScript =
  | 'elvish'
  | 'draconic'
  | 'elestial'
  | 'common'
  | 'druidic '
  | 'dwarvish'
  | 'infernal'
  | 'noScript';

export const languageScriptMap = {
  abyssal: 'infernal',
  aquan: 'elvish',
  auran: 'draconic',
  celestial: 'celestial',
  common: 'common',
  deepSpeech: 'noScript',
  draconic: 'draconic',
  druidic: 'druidic',
  dwarvish: 'dwarvish',
  elvish: 'elvish',
  giant: 'dwarvish',
  gnomish: 'dwarvish',
  goblin: 'dwarvish',
  gnoll: 'common',
  halfling: 'common',
  ignan: 'draconic',
  infernal: 'infernal',
  orc: 'dwarvish',
  primordial: 'dwarvish',
  sylvan: 'elvish',
  terran: 'dwarvish',
  undercommonn: 'elvish'
};
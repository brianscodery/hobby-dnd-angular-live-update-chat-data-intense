import { VersatileStats, DamageType } from './character';
export interface AbilityScore {
  score: number;
  modifier: number;
  passiveScore: number;
}
export interface AbilityScores {
  dexterity: AbilityScore;
  constitution: AbilityScore;
  strength: AbilityScore;
  charisma: AbilityScore;
  intelligence: AbilityScore;
  wisdom: AbilityScore;
}

// export interface AbilityModifier {
//   ability: Ability;
//   modifier: number;
// }

export class SavingThrow {
  savingThrow: number;
  proficient: boolean;
  constructor () { }
}

export class SkillModifiers {
  athletics: number;
  acrobatics: number;
  sleightOfHand: number;
  stealth: number;
  arcana: number;
  history: number;
  investigation: number;
  nature: number;
  religion: number;
  animalHandling: number;
  insight: number;
  medicine: number;
  perception: number;
  survival: number;
  deception: number;
  intimidation: number;
  performance: number;
  persuasion: number;
  constructor () { }
};


export class SavingThrows {
  dexterity: SavingThrow;
  constitution: SavingThrow;
  strength: SavingThrow;
  charisma: SavingThrow;
  wisdom: SavingThrow;
  intelligence: SavingThrow;
  constructor () {
    this.charisma = new SavingThrow();
    this.dexterity = new SavingThrow();
    this.wisdom = new SavingThrow();
    this.intelligence = new SavingThrow();
    this.strength = new SavingThrow();
    this.constitution = new SavingThrow();
  }
}

export type GeneralStatus =
  | 'sentiment_very_satisfied'
  | 'sentiment_satisfied'
  | 'sentiment_dissatisfied'
  | 'sentiment_very_dissatisfied'
  | 'block';

export type Skill =
  | 'acrobatics'
  | 'animalHandling'
  | 'arcana'
  | 'athletics'
  | 'deception'
  | 'history'
  | 'insight'
  | 'intimidation'
  | 'investigation'
  | 'medicine'
  | 'nature'
  | 'perception'
  | 'performance'
  | 'persuasion'
  | 'religion'
  | 'sleightOfHand'
  | 'stealth'
  | 'survival';

export const SKILL_ABILITIES = {
  athletics: 'strength',
  acrobatics: 'dexterity',
  sleightOfHand: 'dexterity',
  stealth: 'dexterity',
  arcana: 'intelligence',
  history: 'intelligence',
  investigation: 'intelligence',
  nature: 'intelligence',
  religion: 'intelligence',
  animalHandling: 'wisdom',
  insight: 'wisdom',
  medicine: 'wisdom',
  perception: 'wisdom',
  survival: 'wisdom',
  deception: 'charisma',
  intimidation: 'charisma',
  performance: 'charisma',
  persuasion: 'charisma',
};

export const SKILLS_IN_ORDER = [
  'acrobatics',
  'animalHandling',
  'arcana',
  'athletics',
  'deception',
  'history',
  'insight',
  'intimidation',
  'investigation',
  'medicine',
  'nature',
  'perception',
  'performance',
  'persuasion',
  'religion',
  'sleightOfHand',
  'stealth',
  'survival',
];

export type Class =
  | 'Barbarian'
  | 'Bard'
  | 'Cleric'
  | 'Druid'
  | 'Fighter'
  | 'Monk'
  | 'Paladin'
  | 'Ranger'
  | 'Rogue'
  | 'Sorcerer'
  | 'Warlock'
  | 'Wizard';

export type Ability =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma';

export const ABILITIES_IN_ORDER: Ability[] = [ 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma' ];
export const TREASURES_IN_ORDER = [ 'cp', 'sp', 'ep', 'gp', 'pp' ];



export type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;


export interface ClassLevel {
  class: Class;
  level: Level;
}
export interface HitPoints {
  current: number;
  max: number;
  temp: number;
}

export type DieNumber = 4 | 6 | 8 | 10 | 12;

export interface HitDie {
  die: DieNumber;
  max: number;
  available: number;
}
export interface Treasure {
  cp: number;
  sp: number;
  ep: number;
  gp: number;
  pp: number;
}
export interface EquipmentItem {
  name: string;
  description: string;
  quantity?: number;
}
export interface Proficiencies {
  skills: Skill[];
  savingThrows: Ability[];
}

export interface CollectedDice {
  usedDice: DieNumber[];
  availableDice: DieNumber[];
  totalDice: number;
}

export interface Character {
  name: string;
  hitPoints: HitPoints;
  spells: string[];
  items: string[];
  languages: string[];
  knowledge: string[];
  abilityScores: AbilityScores;
  proficiencies: Proficiencies;
  generalStatus: GeneralStatus;
  classes: ClassLevel[];
  race: string;
  background: string;
  alignment: string;
  speed: number;
  armourClass: number;
  hitDice: HitDie[];
  treasure: Treasure;
  equipment: EquipmentItem[];
  proficiencyBonus: 1 | 2 | 3 | 4 | 5;
  savingThrows: SavingThrows;
  collectedDice?: CollectedDice;
  skillModifiers?: SkillModifiers;
  weapons: Weapon[];
  size: Size;
}
export type WeaponType = 'melee' | 'ranged';
export type WeaponCategory = 'simple' | 'martial';

export class Weapon {
  name: string;
  type: WeaponType;
  category: WeaponCategory;
  weight: number;
  cost: number;
  damageDie: DieNumber;
  damageType: DamageType;
  ammunition?: boolean;
  ammunitionStats?: AmmunitionStats | false;
  finesse?: boolean;
  heavy?: boolean;
  light?: boolean;
  loading?: boolean;
  ranged?: boolean;
  rangedStats?: RangedStats;
  reach?: boolean;
  special?: boolean;
  specialRules?: string;
  thrown?: boolean;
  twoHanded?: boolean;
  versatile?: boolean;
  versatileStats?: VersatileStats | false;
  silvered?: boolean;
  monk?: boolean;
  constructor (
    name: string,
    type: WeaponType,
    category: WeaponCategory,
    cost: number,
    weight: number,
    damageType: DamageType,
    damageDie: DieNumber,
    conditions?: WeaponCondition[],
    ammunitionStats?: AmmunitionStats,
    rangedStats?: RangedStats,
    versatileStats?: VersatileStats ) {
    this.name = name;
    this.type = type;
    this.category = category;
    this.cost = cost;
    this.weight = weight;
    this.damageDie = damageDie;
    this.damageType = damageType;
    if ( conditions ) {
      conditions.forEach( conditionName => this[ conditionName ] = true );
    }
    if ( ammunitionStats ) { this.ammunitionStats = ammunitionStats; }
    if ( rangedStats ) { this.rangedStats = rangedStats; }
    if ( versatileStats ) { this.versatileStats = versatileStats; }
  }
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

export interface AmmunitionStats {
  available: number;
  limit?: number;
}

export interface RangedStats {
  normalRange: number;
  longRange: number;
}

export interface VersatileStats {
  oneHandedDie: DieNumber;
  twoHandedDie: DieNumber;
}

export type WeaponCondition =
  | 'finesse'
  | 'heavy'
  | 'light'
  | 'loading'
  | 'ranged'
  | 'reach'
  | 'special'
  | 'thrown'
  | 'twoHanded'
  | 'versatile'
  | 'silvered'
  | 'ammunition'
  | 'monk';
export type DamageType =
  | 'acid'
  | 'bludgeoning'
  | 'cold'
  | 'fire'
  | 'force'
  | 'lightning'
  | 'necrotic'
  | 'piercing'
  | 'poison'
  | 'psychic'
  | 'radiant'
  | 'slashing'
  | 'thunder';
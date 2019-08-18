import { VersatileStats, DamageType } from './character';
import { AnimationDurations } from '@angular/material';
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
export interface Proficiencies {
  skills: Skill[];
  savingThrows: Ability[];
  list?: string[];
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
  treasures: Treasures;
  equipment: EquipmentItem[];
  proficiencyBonus: 1 | 2 | 3 | 4 | 5;
  savingThrows: SavingThrows;
  collectedDice?: CollectedDice;
  skillModifiers?: SkillModifiers;
  weaponList: string[];
  weapons?: Weapon[];
  size: Size;
  wearingArmour?: boolean;
  usingShield?: boolean;
  traits?: CharacterTrait[];
}
export interface CharacterTrait {
  name: string;
  descriptionParagraphs: string[];
  blurb?: string;
  from: TraitSource;
}

export type TraitSource= Class | Race | any;

export type Race =
  | 'Dragonborn'
  | 'Dwarf'
  | 'Eladrin'
  | 'Elf'
  | 'Gnome'
  | 'Half - elf'
  | 'Half - orc'
  | 'Tiefling'
  | 'Halfling'
  | 'Human';

export type WeaponRange = 'melee' | 'ranged';
export type WeaponCategory = 'simple' | 'martial';

export class Weapon {
  name: string;
  range: WeaponRange;
  category: WeaponCategory;
  weight: number;
  cost: Cost;
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
  magicalBonus?: number;
  dieAndDamage?: DieAndDamage;
  currentNumberOfHands?: Handedness;
  versatileDamageDie?: number;
  attackBonus?: number;
  constructor (
    name: string,
    range: WeaponRange,
    category: WeaponCategory,
    cost: Cost,
    weight: number,
    damageType: DamageType,
    damageDie: DieNumber,
    rangedStats: RangedStats,
    properties?: WeaponProperty[],
    ammunitionStats?: AmmunitionStats,
    versatileStats?: VersatileStats,
    magicalBonus?: number ) {
    this.name = name;
    this.range = range;
    this.category = category;
    this.cost = cost;
    this.weight = weight;
    this.damageDie = damageDie;
    this.damageType = damageType;
    if ( properties ) {
      properties.forEach( propertyName => this[ propertyName ] = true );
    }
    if ( ammunitionStats ) { this.ammunitionStats = ammunitionStats; }
    if ( rangedStats ) { this.rangedStats = rangedStats; }
    if ( versatileStats ) { this.versatileStats = versatileStats; }
    if ( magicalBonus ) { this.magicalBonus = magicalBonus; }
  }
}

export class DieAndDamage {
  oneHanded: string;
  twoHanded: string;
}
export type handedness = 'oneHanded' | 'twoHanded';

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

export interface Cost {
  denomination: Treasure;
  quantity: number;
}

export type WeaponProperty =
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

export class Armour {
  name: string;
  weightCategory: ArmourWeightCategory;
  armourClass: ArmourClass;
  cost: Cost;
  weight: number;
  stealthDisadvantage?: boolean;
  strengthMinimum?: number;
  magicalBonus?: number;
  constructor ( name: string, wtCat: ArmourWeightCategory, ac: ArmourClass, cost: Cost, weight: number, stlthDis?: boolen, strMin?: number, magBonus?: number ) {
    this.name = name;
    this.weightCategory = wtCat;
    this.armourClass = ac;
    this.cost = cost;
    this.weight = weight;
    this.stealthDisadvantage = stlthDis;
    this.strengthMinimum = strMin;
    this.magicalBonus = magBonus;
  }
}

export type ArmourWeightCategory =
  | 'light'
  | 'medium'
  | 'heavy';

export interface ArmourClass {
  baseAC?: number | null;
  dexBonus: boolean;
  maxBonus: number;
}

export interface Spell {
  castingTime: Time;
  classes: Class[];
  components: MagicComponent[];
  concentration: boolean;
  description: string[];
  duration: Time | 'until dispelled';
  level: SpellLevel;
  name: string;
  page: string;
  range: Range;
  ritual: boolean;
  school: MagicSchool;
}

export type MagicComponent = 'verbal' | 'somatic' | 'material';

export interface Time {
  quantity: number;
  denomination: TimeUnit;
}
export type SpellLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type TimeUnit =
  | 'action'
  | 'reaction'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'
  | 'instantaneous';

export type MagicSchool =
  | 'abjuration'
  | 'conjuration'
  | 'divination'
  | 'enchantment'
  | 'evocation'
  | 'illusion'
  | 'necromancy'
  | 'transmutation';
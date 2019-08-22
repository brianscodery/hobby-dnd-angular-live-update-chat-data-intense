


// export interface AbilityModifier {
//   ability: Ability;
//   modifier: number;
// }












export const TREASURES_IN_ORDER = [ 'cp', 'sp', 'ep', 'gp', 'pp' ];





export interface HitPoints {
  current: number;
  max: number;
  temp: number;
}

export type DieNumber = 4 | 6 | 8 | 10 | 12 | 20;

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
  userId: string;
  hitPoints: HitPoints;
  items: string[];
  languages: SpokenLanguage[];
  knowledge: string[];
  abilityScores: AbilityScores;
  proficiencies: Proficiencies;
  generalStatus: GeneralStatus;
  classes: ClassLevel[];
  race: string;
  background: Background;
  speed: number;
  armourClass: number;
  hitDice: HitDie[];
  treasures: Treasures;
  equipment: EquipmentItem[];
  proficiencyBonus: ProficiencyBonusOption;
  savingThrows: SavingThrows;
  collectedDice?: CollectedDice;
  skillModifiers?: SkillModifiers;
  weaponList: string[];
  weapons?: Weapon[];
  size: Size;
  wearingArmour?: boolean;
  usingShield?: boolean;
  traits?: CharacterTrait[];
  spellStats?: SpellStats;
  alignment: Alignment;
}

export interface SpellStats {
  spellsKnownNumber?: number | 'no limit';
  cantripsKnownNumber ?: number;
  spellsPerLongRest ?: SpellLevel[];
  spellsRemaining ?: SpellLevel[];
  multiClassSpellsPerDay ?: SpellLevel[];
  spells ?: string[];
  preparableSpells ?: number;
}
export interface Alignment {
  lawfulness: 'lawful' | 'neutral' | 'chaotic';
  goodness: 'good' | 'neutral' | 'evil';
}
export interface CharacterTrait {
  name: string;
  descriptionParagraphs: string[];
  blurb?: string;
  from: TraitSource;
}
export interface Background {
  name: string;
  description: string;
  proficiencyList?: ProficiencyList;
  equipment: string[];
  features?: string[];
  traits?: { name?: string, description: string }[];
  ideals?: { name?: string, description: string }[];
  bonds?: { name?: string, description: string }[];
  flaws?: { name?: string, description: string }[];
}

export interface ProficiencyList {
  skills?: Skill[];
  tools?: string[];
  languages?: SpokenLanguage[];
}
export type TraitSource = Class | Race | any;
export type ProficiencyBonusOption = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Race =
  | 'dragonborn'
  | 'dwarf'
  | 'eladrin'
  | 'elf'
  | 'gnome'
  | 'halfElf'
  | 'halfOrc'
  | 'tiefling'
  | 'halfling'
  | 'human';

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
export type Handedness = 'oneHanded' | 'twoHanded';

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
  constructor ( name: string, wtCat: ArmourWeightCategory, ac: ArmourClass, cost: Cost, weight: number, stlthDis?: boolean, strMin?: number, magBonus?: number ) {
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
  duration: string;
  level: SpellLevel;
  name: string;
  page: string;
  range: string;
  ritual: boolean;
  school: MagicSchool;
  material?: string;
  higherLevels?: string;
  archetype?: string;
  circles?: string;
}

export type MagicComponent = 'verbal' | 'somatic' | 'material';

export interface Time {
  quantity?: number;
  denomination: TimeUnit;
}
export type SpellLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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

export type MagicSchool =
  | 'abjuration'
  | 'conjuration'
  | 'divination'
  | 'enchantment'
  | 'evocation'
  | 'illusion'
  | 'necromancy'
  | 'transmutation';

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
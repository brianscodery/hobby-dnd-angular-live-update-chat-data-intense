import { Cost, DieNumber } from './../shared/common-interfaces-and-types';


export interface ArmourClass {
  baseAC?: number | null;
  dexBonus: boolean;
  maxBonus: number;
}

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
  constructor (
    name: string,
    wtCat: ArmourWeightCategory,
    ac: ArmourClass,
    cost: Cost,
    weight: number,
    stlthDis?: boolean,
    strMin?: number,
    magBonus?: number )
  {
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

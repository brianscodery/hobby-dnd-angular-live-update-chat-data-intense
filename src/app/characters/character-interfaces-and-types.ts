import { Race } from './../races/race-interfaces-and-types';
import { SpellStats } from './../spells/spell-interfaces-and-types';
import { Weapon } from './../combat/combat-interfaces-and-types';
import { ClassAndLevel, ClassName } from './../classes/class-interfaces-and-types';
import {
  AbilityScores,
  Proficiencies,
  ProficiencyBonusOption,
  SavingThrows,
  SkillModifiers,
  Skill
} from './../abilities/abilityInterfacesAndTypes';
import { SpokenLanguage, HitDie, Treasures, EquipmentItem, CollectedDice, Size } from '../shared/common-interfaces-and-types';



export type GeneralStatus =
  | 'sentiment_very_satisfied'
  | 'sentiment_satisfied'
  | 'sentiment_dissatisfied'
  | 'sentiment_very_dissatisfied'
  | 'block';

export interface HitPoints {
  current: number;
  max: number;
  temp: number;
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
  classes: ClassAndLevel[];
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

export type TraitSource = ClassName | Race | any;
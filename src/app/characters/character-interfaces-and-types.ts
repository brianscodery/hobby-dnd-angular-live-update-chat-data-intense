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
  abilityScores: AbilityScores;
  alignment: Alignment;
  armourClass: number;
  background: Background;
  classes: ClassAndLevel[];
  collectedDice?: CollectedDice;
  equipment: EquipmentItem[];
  generalStatus: GeneralStatus;
  hitDice: HitDie[];
  hitPoints: HitPoints;
  items: string[];
  knowledge: string[];
  languages: SpokenLanguage[];
  name: string;
  proficiencies: Proficiencies;
  proficiencyBonus: ProficiencyBonusOption;
  race: string;
  savingThrows: SavingThrows;
  size: Size;
  skillModifiers?: SkillModifiers;
  speed: number;
  spellStats?: SpellStats;
  traits?: CharacterTrait[];
  treasures: Treasures;
  userId: string;
  usingShield?: boolean;
  weaponList: string[];
  weapons?: Weapon[];
  wearingArmour?: boolean;
  deceased?: boolean;
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
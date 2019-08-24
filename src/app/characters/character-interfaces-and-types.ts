

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
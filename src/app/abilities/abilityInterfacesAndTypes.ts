export interface Abilities {
}

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

export type Ability =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma';

export const ABILITIES_IN_ORDER: Ability[] = [ 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma' ];

export interface AbilityScores {
  dexterity: AbilityScore;
  constitution: AbilityScore;
  strength: AbilityScore;
  charisma: AbilityScore;
  intelligence: AbilityScore;
  wisdom: AbilityScore;
}


export interface AbilityScore {
  score: number;
  modifier: number;
  passiveScore: number;
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

export interface Proficiencies {
  skills: Skill[];
  savingThrows: Ability[];
  list?: string[];
}


export type ProficiencyBonusOption = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
import {
  AbilityScores,
  SavingThrows,
  Character,
  Ability,
  SkillModifiers,
  SKILL_ABILITIES,
  Skill,
  AbilityScore
} from './../interfaces/character';
import { Injectable } from '@angular/core';
import find from 'lodash-es/find';
import forEach from 'lodash-es/forEach';
import cloneDeep from 'lodash-es/cloneDeep';


@Injectable({
  providedIn: 'root',
})


export class DnDMathService {
  skillsInOrder = [ 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma' ];
  constructor() { }

  public getModifier(score: number): number {
    return Math.floor(score / 2) - 5;
  }

  public getAbilityScoresWithModifiers(character: Character): AbilityScores {
    const abilityScores: AbilityScores = cloneDeep(character.abilityScores);
    forEach(abilityScores, (value, key) => {
      abilityScores[ key ].modifier = this.getModifier(value.score);
      abilityScores[ key ].passiveScore = 10 + abilityScores[ key ].modifier;
    });
    return abilityScores;
  }

  public getSavingThrows(character: Character): SavingThrows {
    const savingThrows: SavingThrows = new SavingThrows();
    forEach(savingThrows, (value: any, key: Ability) => {
      const proficient = character.proficiencies.savingThrows.includes(key);
      const abilityModifier: number = character.abilityScores[ key ].modifier;
      const savingThrow = abilityModifier + (proficient ? character.proficiencyBonus : 0);
      savingThrows[ key ] = { savingThrow, proficient };
    });
    console.log(`savingThrows: ${ JSON.stringify(savingThrows) }`);
    return savingThrows;
  }

  public getSkillModifiers(character: Character): SkillModifiers {
    const proficiencies = [ ...character.proficiencies.skills ];
    const proficiencyBonus = character.proficiencyBonus;
    const abilityScores: AbilityScores = character.abilityScores;
    const skillModifiers: SkillModifiers = new SkillModifiers();
    console.log(skillModifiers);
    forEach(SKILL_ABILITIES, (ability: Ability, skill: Skill) => {
      const baseModifier = abilityScores[ ability ].modifier;
      const proficiencyModifier = proficiencies.includes(skill) ? proficiencyBonus : 0;
      const finalModifier = baseModifier + proficiencyModifier;
      skillModifiers[ skill ] = finalModifier;
    })
    console.log(skillModifiers);
    return skillModifiers;
  }
}

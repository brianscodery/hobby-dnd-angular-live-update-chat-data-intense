import {
  AbilityScores,
  SavingThrows,
  Character,
  Ability,
  SkillModifiers,
  SKILL_ABILITIES,
  Skill,
  AbilityScore,
  ClassLevel,
  ProficiencyBonusOption,
  SpellLevel
} from './../interfaces/character';
import { Injectable } from '@angular/core';
import forEach from 'lodash-es/forEach';
import cloneDeep from 'lodash-es/cloneDeep';


@Injectable( {
  providedIn: 'root',
} )


export class DnDMathService {
  skillsInOrder = [ 'strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma' ];
  constructor () { }

  public getModifier( score: number ): number {
    return Math.floor( score / 2 ) - 5;
  }

  public getAbilityScoresWithModifiers( character: Character ): AbilityScores {
    const abilityScores: AbilityScores = cloneDeep( character.abilityScores );
    forEach( abilityScores, ( value, key ) => {
      abilityScores[ key ].modifier = this.getModifier( value.score );
      abilityScores[ key ].passiveScore = 10 + abilityScores[ key ].modifier;
    } );
    return abilityScores;
  }

  public getSavingThrows( character: Character ): SavingThrows {
    const savingThrows: SavingThrows = new SavingThrows();
    forEach( savingThrows, ( value: any, key: Ability ) => {
      const proficient = character.proficiencies.savingThrows.includes( key );
      const abilityModifier: number = character.abilityScores[ key ].modifier;
      const savingThrow = abilityModifier + ( proficient ? character.proficiencyBonus : 0 );
      savingThrows[ key ] = { savingThrow, proficient };
    } );
    console.log( `savingThrows: ${ JSON.stringify( savingThrows ) }` );
    return savingThrows;
  }

  public getSkillModifiers( character: Character ): SkillModifiers {
    const proficiencies = [ ...character.proficiencies.skills ];
    const proficiencyBonus = character.proficiencyBonus;
    const abilityScores: AbilityScores = character.abilityScores;
    const skillModifiers: SkillModifiers = new SkillModifiers();
    console.log( skillModifiers );
    forEach( SKILL_ABILITIES, ( ability: Ability, skill: Skill ) => {
      const baseModifier = abilityScores[ ability ].modifier;
      const proficiencyModifier = proficiencies.includes( skill ) ? proficiencyBonus : 0;
      const finalModifier = baseModifier + proficiencyModifier;
      skillModifiers[ skill ] = finalModifier;
    } )
    console.log( skillModifiers );
    return skillModifiers;
  }

  public getMultiClassSpellLevel( character: Character ) {
    let multiClassLevel = 0;
    character.classes.forEach( ( classLevel: ClassLevel ) => {
      switch ( classLevel.class ) {
        case 'bard':
        case 'cleric':
        case 'druid':
        case 'sorcerer':
        case 'wizard':
          multiClassLevel += classLevel.level;
          return;
        case 'paladin':
        case 'ranger':
          multiClassLevel += Math.floor( classLevel.level / 2 );
      }
    } );
    return multiClassLevel;
  }

  public getMultiClassSpellSlots( multiClassSpellLevel: number ): SpellLevel[] {
    const multiClassSpellSlots: number[] = [0,0,0,0,0,0,0,0,0];
    switch ( true ) {
      case multiClassSpellLevel === 1:
        multiClassSpellSlots[ 1 ] = 2;
        break;
      case multiClassSpellLevel === 2:
        multiClassSpellSlots[ 1 ] = 3;
        break;
      case multiClassSpellLevel >= 3:
        multiClassSpellSlots[ 1 ] = 4;
        multiClassSpellSlots[ 2 ] = 2;
      case multiClassSpellLevel >= 4:
        multiClassSpellSlots[ 2 ] = 3;
      case multiClassSpellLevel >= 5:
        multiClassSpellSlots[ 3 ] = 2;
      case multiClassSpellLevel >= 5:
        multiClassSpellSlots[ 3 ] = 2;
      case multiClassSpellLevel >= 6:
        multiClassSpellSlots[ 3 ] = 3;
      case multiClassSpellLevel >= 7:
        multiClassSpellSlots[ 4 ] = 1;
      case multiClassSpellLevel >= 8:
        multiClassSpellSlots[ 4 ] = 2;
      case multiClassSpellLevel >= 9:
        multiClassSpellSlots[ 4 ] = 3;
        multiClassSpellSlots[ 5 ] = 1;
      case multiClassSpellLevel >= 10:
        multiClassSpellSlots[ 5 ] = 2;
      case multiClassSpellLevel >= 11:
        multiClassSpellSlots[ 6 ] = 1;
      case multiClassSpellLevel >= 13:
        multiClassSpellSlots[ 7 ] = 1;
      case multiClassSpellLevel >= 15:
        multiClassSpellSlots[ 8 ] = 1;
      case multiClassSpellLevel >= 17:
        multiClassSpellSlots[ 9 ] = 1;
      case multiClassSpellLevel >= 18:
        multiClassSpellSlots[ 5 ] = 3;
      case multiClassSpellLevel >= 19:
        multiClassSpellSlots[ 6 ] = 2;
      case multiClassSpellLevel === 20:
        multiClassSpellSlots[ 7 ] = 2;
      default:
        break;
      }
      return [...multiClassSpellSlots] as SpellLevel[];
  }

  public getProficienctBonus( character: Character ): ProficiencyBonusOption {
    let characterLevel = 0;
    character.classes.forEach( ( classLevel: ClassLevel ) => {
      characterLevel += classLevel.level;
    } );
    return Math.ceil( characterLevel / 4 ) + 1 as ProficiencyBonusOption;
  }
}

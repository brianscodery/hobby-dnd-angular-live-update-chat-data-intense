import { Weapon, DieAndDamage } from './../combat/combat-interfaces-and-types';
import { Character } from '../characters/character-interfaces-and-types';
import { SpellService } from './apis/spell.service';
import { HitDie, DieNumber } from '../shared/common-interfaces-and-types';
import { DnDMathService } from './dnd-math.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import cloneDeep from 'lodash-es/cloneDeep';


@Injectable( {
  providedIn: 'root',
} )
export class CharacterService {
  partyMembers$: Observable<Character[]>;
  charactersCollectionRef: AngularFirestoreCollection<Character>;

  constructor (
    private afs: AngularFirestore,
    private dndMathService: DnDMathService,
    private spellService: SpellService )
  {
    this.charactersCollectionRef = afs
      .collection<Character>( 'partyMembers' );
    this.partyMembers$ = this.charactersCollectionRef
      .valueChanges()
      .pipe(
        map( characters => {
          characters.map( character => {
            this.addGeneralStatus( character );
            return character;
          } );
          console.log( characters );
          return characters;
        } ),

        map( ( characters: Character[] ) => {
          characters.forEach(
            ( character: Character ) => {
              character.proficiencyBonus = this.dndMathService.getProficienctBonus( character );
            } );
          return characters;
        } ),

        map( characters => {
          characters.map( character => {
            this.addModifiers( character );
            return character;
          } );
          console.log( characters );
          return characters;
        } ),

        map( characters => {
          characters.map( character => {
            this.addSavingThrows( character );
            return character;
          } );
          console.log( characters );
          return characters;
        } ),

        map( characters => {
          characters.forEach( ( character ) => {
            this.collectHitDice( character );
          } );
          console.log( characters );
          return characters;
        } ),
        
        map( ( characters: Character[] ) => {
          characters.forEach(
            ( character: Character ) => {
              this.addSkillModifiers( character );
            } );
          return characters;
        } ),

        map( ( characters: Character[] ) => {
          characters.forEach(
            ( character: Character ) => {
              this.generateWeaponsDetails( character );
            } );
          return characters;
        } ),


        map( ( characters: Character[] ) => {
          characters.forEach(
            ( character: Character ) => {
              this.addSpellSlots(character);
            } );
          return characters;
        } ),
      );
  }

  addDieAndDamage( weapon: Weapon, character: Character ) {
    let modifierToUse = weapon.ranged ? 'dexterity' : 'strength';
    const dexModifier = character.abilityScores.dexterity.modifier;
    const strModifier = character.abilityScores.strength.modifier;
    if ( weapon.monk && dexModifier > strModifier ) {
      modifierToUse = 'dexterity';
    }
    const modifier = modifierToUse === 'strength' ? strModifier : dexModifier;
    weapon.attackBonus = modifier;
    const dieText = `1d${ weapon.damageDie }`;
    let modifierText: string;
    switch ( true ) {
      case modifier < 0:
        modifierText = '- ';
        break;
      case modifier === 0:
        modifierText = '';
        break;
      default:
        modifierText = '+ ';
        break;
    }
    modifierText = modifier ? ( modifierText + Math.abs( modifier ) ) : modifierText;
    const damageType = weapon.damageType[ 0 ].toUpperCase() + weapon.damageType.slice( 1 );
    weapon.dieAndDamage = new DieAndDamage();
    weapon.dieAndDamage.oneHanded = `${ dieText } ${ modifierText } ${ damageType }`;
    const versatileDieText = weapon.versatile ? `1d${ weapon.versatileDamageDie }` : dieText;
    weapon.dieAndDamage.twoHanded = `${ versatileDieText } ${ modifierText } ${ damageType }`;
  }

  private addGeneralStatus( character: Character ): void {
    const current = character.hitPoints.current;
    const max = character.hitPoints.max;
    const hitPointsPercentage = current / max;
    switch ( true ) {
      case hitPointsPercentage <= 0:
        character.generalStatus = 'block';
        break;
      case hitPointsPercentage <= 0.25:
        character.generalStatus = 'sentiment_very_dissatisfied';
        break;
      case hitPointsPercentage <= 0.5:
        character.generalStatus = 'sentiment_dissatisfied';
        break;
      case hitPointsPercentage <= 0.75:
        character.generalStatus = 'sentiment_satisfied';
        break;
      default:
        character.generalStatus = 'sentiment_very_satisfied';
        break;
    }
    console.log( character );
  }

  private addSavingThrows( character: Character ): void {
    character.savingThrows = this.dndMathService.getSavingThrows( character );
  }

  private addModifiers( character: Character ): void {
    character.abilityScores = this.dndMathService.getAbilityScoresWithModifiers( character );
  }

  private collectHitDice( character: Character ): void {
    const hitDice: HitDie[] = cloneDeep( character.hitDice );
    const availableDice: DieNumber[] = [];
    const usedDice: DieNumber[] = [];
    hitDice.forEach( hitDie => {
      const avail: number = hitDie.available;
      const used = hitDie.max - avail;
      for ( let i = 0; i < avail; i++ ) {
        availableDice.push( hitDie.die );
      }
      for ( let i = 0; i < used; i++ ) {
        usedDice.push( hitDie.die );
      }
    } );
    const totalDice: number = availableDice.length + usedDice.length;
    character.collectedDice = { usedDice, availableDice, totalDice };
  }

  private addSkillModifiers( character: Character ): void {
    character.skillModifiers = this.dndMathService.getSkillModifiers( character );
  }

  private generateWeaponsDetails( character ): void {
    const weapons: Weapon[] = [];
    character.weaponList.forEach( ( weapon: string ) => {
      this.afs.collection<Weapon>( 'weapons', ref => ref.where( 'name', '==', weapon ).limit( 1 ) ).get().toPromise().then(
        // weaponArr => {
        //   if ( weaponArr.empty ) {
        //     console.log( 'no weapon matches found' );
        //     return;
        //   }
        //   console.log( weaponArr[ 0 ].id );
        //   weapons.push( weaponArr[ 0 ].data );
        // }
        snapshot => {
          if ( snapshot.empty ) {
            console.log( 'No matching documents.' );
            return;
          }

          snapshot.forEach( doc => {
            const data = doc.data() as Weapon;
            this.addDieAndDamage( data, character );
            data.currentNumberOfHands = 'oneHanded';
            console.log( doc.id, '=>', data );
            weapons.push( data );
          } );
        } )
        .catch( err => {
          console.log( 'Error getting documents', err );
        } );
    } );

    character.weapons = weapons;
    console.log( character.weapons );

  }

  private addSpellSlots( character: Character ): void {
    character.spellStats = this.spellService.getSpellStats( character );
  }

  update( characterName: string, updateObject ): void{
    this.charactersCollectionRef.doc( characterName ).update( updateObject );
}



}



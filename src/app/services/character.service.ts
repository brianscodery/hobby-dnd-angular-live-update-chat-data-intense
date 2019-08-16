import  forEach  from 'lodash-es/forEach';
import { HitDie, DieNumber } from './../interfaces/character';
import { DnDMathService } from './dnd-math.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character';
import { map } from 'rxjs/operators';
import cloneDeep from 'lodash-es/cloneDeep';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  partyMembers$: Observable<Character[]>;

  private addGeneralStatus(character: Character): void {
    const current = character.hitPoints.current;
    const max = character.hitPoints.max;
    const hitPointsPercentage = current / max;
    switch (true) {
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
    console.log(character);
  }

  private addSavingThrows(character: Character): void {
    character.savingThrows = this.dndMathService.getSavingThrows(character);
  }

  private addModifiers(character: Character): void {
    character.abilityScores = this.dndMathService.getAbilityScoresWithModifiers(character);
  }

  private collectHitDice(character: Character): void {
    const hitDice: HitDie[] = cloneDeep(character.hitDice);
    const availableDice: DieNumber[] = [];
    const usedDice: DieNumber[] = [];
    hitDice.forEach(hitDie => {
      const avail: number = hitDie.available;
      const used = hitDie.max - avail;
      for (let i = 0; i < avail; i++) {
        availableDice.push(hitDie.die);
      }
      for (let i = 0; i < used; i++) {
        usedDice.push(hitDie.die);
      }
    });
    const totalDice: number = availableDice.length + usedDice.length;
    character.collectedDice = { usedDice, availableDice, totalDice };
  }

  private addSkillModifiers(character: Character): void {
    character.skillModifiers = this.dndMathService.getSkillModifiers(character);
}

  constructor(private afs: AngularFirestore, private dndMathService: DnDMathService) {
    this.partyMembers$ = afs
      .collection<Character>('partyMembers')
      .valueChanges()
      .pipe(
        map(characters => {
          characters.map(character => {
            this.addGeneralStatus(character);
            return character;
          });
          console.log(characters);
          return characters;
        }),

        map(characters => {
          characters.map(character => {
            this.addModifiers(character);
            return character;
          });
          console.log(characters);
          return characters;
        }),

        map(characters => {
          characters.map(character => {
            this.addSavingThrows(character);
            return character;
          });
          console.log(characters);
          return characters;
        }),

        map(characters => {
          characters.forEach((character) => {
            this.collectHitDice(character);
          });
          console.log(characters);
          return characters;
        }),

        map((characters: Character[]) => {
          characters.forEach(
            (character: Character) => {
              this.addSkillModifiers(character);
            });
          return characters;
        })
      );
  }
}

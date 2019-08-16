import { WeaponService } from './../../services/weapon.service';
import { DnDMathService } from './../../services/dnd-math.service';
import { Component, Input, OnInit } from '@angular/core';
import { Character, AbilityScores, Ability, HitDie, SavingThrows, ABILITIES_IN_ORDER, TREASURES_IN_ORDER, SKILLS_IN_ORDER } from './../../interfaces/character';


@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: [ './character-sheet.component.scss' ],
})
export class CharacterSheetComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  @Input() character: Character;
  abilitiesInOrder: Ability[] = ABILITIES_IN_ORDER;
  treasuresInOrder = TREASURES_IN_ORDER;
  skillsInOrder = SKILLS_IN_ORDER;
  disabled: boolean;
  multipleClasses: boolean;
  classPlaceholder: string;
  levelPlaceholder: string;
  passiveScores: string;

  constructor(private dndMathService: DnDMathService, private weaponService: WeaponService) { }

  ngOnInit() {



    this.disabled = false;
    this.multipleClasses = this.character.classes.length > 1 ? true : false;
    this.passiveScores = `Passive Strength: ${ this.character.abilityScores.strength.passiveScore }
Passive Dexterity: ${this.character.abilityScores.dexterity.passiveScore }
Passive Intelligence: ${this.character.abilityScores.intelligence.passiveScore }
Passive Charisma: ${this.character.abilityScores.charisma.passiveScore }
Passive Constitution: ${this.character.abilityScores.constitution.passiveScore }
Passive Wisdom: ${this.character.abilityScores.wisdom.passiveScore }`;
  }

  // getPath(die: HitDice): string {
  //   return `../../../assets/images/d${die.die}.svg`;
  // }

  getArray(size: number) {
    const arr = [];
    arr.length = size;
    return arr;
  }


}

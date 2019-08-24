import { Weapon } from './../../combat/combat-interfaces-and-types';
import { Ability, ABILITIES_IN_ORDER, SKILLS_IN_ORDER } from './../../abilities/abilityInterfacesAndTypes';
import { Character } from './../../characters/character-interfaces-and-types';
import { SpellService } from '../../core/apis/spell.service';
import { WeaponService } from '../../core/apis/weapon.service';
import { DnDMathService } from '../../core/dnd-math.service';
import { Component, Input, OnInit } from '@angular/core';
import { HitDie, TREASURES_IN_ORDER} from '../../shared/common-interfaces-and-types';
import { CharacterService } from '../../core/character.service';
@Component( {
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: [ './character-sheet.component.scss' ],
} )
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
  step = 0;
  flawsText = '';

  constructor (
    private dndMathService: DnDMathService,
    private weaponService: WeaponService,
    private spellService: SpellService,
    private characterService: CharacterService,
  ) { }

  ngOnInit() {
    this.character.background.flaws.forEach( flaw => this.flawsText += flaw.description + '\n' );


    this.disabled = false;
    this.multipleClasses = this.character.classes.length > 1 ? true : false;
    this.passiveScores = this.getPassiveScores();
  }


  getArray( size: number ) {
    const arr = [];
    arr.length = size;
    return arr;
  }

  getPassiveScores(): string {
    const passiveScoresText =
      `Passive Strength: ${ this.character.abilityScores.strength.passiveScore }
Passive Dexterity: ${this.character.abilityScores.dexterity.passiveScore }
Passive Intelligence: ${this.character.abilityScores.intelligence.passiveScore }
Passive Charisma: ${this.character.abilityScores.charisma.passiveScore }
Passive Constitution: ${this.character.abilityScores.constitution.passiveScore }
Passive Wisdom: ${this.character.abilityScores.wisdom.passiveScore }`;
    return passiveScoresText;
  }

  toggleNumberOfHands( weapon: Weapon ) {
    weapon.currentNumberOfHands = weapon.currentNumberOfHands === 'oneHanded' ? 'twoHanded' : 'oneHanded';
  }



  setStep( index: number ) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  showCharacter() {
  console.log(this.character);
}

  updateCurrentHitPoints( event ) {
    const newHitPoints = parseInt(event.target.value, 10);
    const hitPoints = { ...this.character.hitPoints };
    hitPoints.current = newHitPoints;
    const characterName = this.character.name.toLowerCase();
    this.characterService.update( characterName, { hitPoints } );
  }

  successSliderChange( event ) {
    if ( event.value === 3 ) {
      const newHitPoints = 1;
      const hitPoints = { ...this.character.hitPoints };
      hitPoints.current = newHitPoints;
      const characterName = this.character.name.toLowerCase();
      this.characterService.update( characterName, { hitPoints } );
    }
  }
}

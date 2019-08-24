import { SpellStats } from './../../interfaces/character';
import { Character } from '../../characters/character-interfaces-and-types';
import { ClassName, ClassLevel, ClassAndLevel } from './../../classes/class-interfaces-and-types';
import { Spell, MagicSchool, MagicComponent, SpellLevel, SpellStats, SPELLCASTER_CLASSES } from './../../spells/spell-interfaces-and-types';
// tslint:disable: no-switch-case-fall-through


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { findIndex } from 'lodash-es';

import {
  Time,
  TimeUnit,
} from '../../shared/common-interfaces-and-types';


@Injectable( {
  providedIn: 'root'
} )
export class SpellService {
  spells: Spell[];
  spells$: Observable<any>;

  constructor ( private http: HttpClient, private afs: AngularFirestore ) {
    // this.addWeaponsToDB();
    // this.addArmourToDB();
    console.log( 'here i am!!!' );
  }
  addSpellsToDB() {
    const next = 'https://api-beta.open5e.com/spells/?format=json&page=8';
    const spellsCollection = this.afs.collection<Spell>( 'spells' );

    this.http
      .get<any>( next )
      .subscribe( response => {
        console.log( response.next );
        const results: any[] = response.results;
        results.forEach( spell => {
          console.log( spell );
          const castingTime = this.getCastingTime( spell.casting_time );
          const classes: ClassName[] = spell.dnd_class.toLowerCase().split( ', ' );
          const concentration = this.yesNoToBoolean( spell.concentration );
          const description = this.getDescription( spell );
          const components = this.getMagicComponents( spell );
          const duration: string = spell.duration.toLowerCase();
          const level = this.getLevel( spell );
          const name = this.getSpellName( spell );
          console.log( name );
          const page: string = spell.page.toLowerCase();
          const range = spell.range.toLowerCase();
          const ritual = this.yesNoToBoolean( spell.ritual );
          const school: MagicSchool = spell.school.toLowerCase() as MagicSchool;
          const material: string = spell.material;
          const higherLevels: string = spell.higher_level;
          const circles: string = spell.circles;
          const archetype: string = spell.archetype;

          const newSpell: Spell = {
            castingTime, classes, concentration, description,
            components, duration, level, name, page, range, ritual, school
          };
          if ( material ) { newSpell.material = material; }
          if ( higherLevels ) { newSpell.higherLevels = higherLevels; }
          if ( circles ) { newSpell.circles = circles; }
          if ( archetype ) { newSpell.archetype = archetype; }

          spellsCollection.doc( name ).set( newSpell );
        } );
      } );
  }


  getCastingTime( castingTimeString: string ): Time {
    const lowercaseCastingTimeString = castingTimeString.toLowerCase();
    const index: number = lowercaseCastingTimeString.indexOf( ' ' );
    if ( index === -1 ) {
      return { denomination: lowercaseCastingTimeString as TimeUnit };
    }
    const time = {
      quantity: parseInt( lowercaseCastingTimeString.substring( 0, index + 1 ), 10 ),
      denomination: lowercaseCastingTimeString.substring( index + 1 ) as TimeUnit
    };
    return time;
  }

  getMagicComponents( spell: any ): MagicComponent[] {
    const magicComponents: string[] = spell.components
      .toLowerCase()
      .split( ', ' );
    magicComponents.map( initial => {
      switch ( initial ) {
        case 'v':
          return 'verbal';
        case 's':
          return 'somatic';
        case 'm':
          return 'material';
      }
      return;
    } );
    return magicComponents as MagicComponent[];
  }

  getDescription( spell ) {
    const spellString: string = spell.desc;
    const description = spellString.split( '\n\n' );
    return description;
  }

  getLevel( spell ): SpellLevel {
    const level: string = spell.level;
    return parseInt( level[ 0 ], 10 ) as SpellLevel;
  }

  getSpellName( spell ): string {
    const name: string = spell.name.replace( /\//ig, ' - ' );
    if ( name.includes( ' ' ) ) {
      const nameParts = name.split( ' ' );
      const newNameParts = nameParts.map( word => {
        return word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase();
      } );
      console.log( newNameParts );
      newNameParts[ 0 ] = newNameParts[ 0 ].toLowerCase();
      console.log( newNameParts );
      return newNameParts.join( '' );
    }
    return name.toLowerCase();
  }

  yesNoToBoolean( yesOrNo: string ) {
    const assureLowercase = yesOrNo.toLowerCase();
    return assureLowercase === 'yes' ? true : false;
  }

  getSpellStats( character: Character ): SpellStats | null {
    const characterSpellcastingClasses: ClassName[] = this.getCharacterSpellcastingClasses( character );
    if ( !characterSpellcastingClasses.length ) {
      return null;
    }
    if ( characterSpellcastingClasses.length === 1 ) {
      return this.getSingleClassSpellStats( character, characterSpellcastingClasses[ 0 ] );
    }
    else {
      return this.getMultiClassSpellStats( character );
    }
  }

  getCharacterSpellcastingClasses( character ): ClassName[] {
    const classes: ClassAndLevel[] = character.classes;
    return classes
      .map( ( classAndLevel: ClassAndLevel ) => classAndLevel.class as ClassName )
      .filter( ( className: ClassName ) => SPELLCASTER_CLASSES.includes( className ) );
  }

  // isMultiClassSpellLevel( character: Character ): boolean {
  //   const characterSpellcastingClasses: ClassName[] = this.getCharacterSpellcastingClasses( character );
  //   return characterSpellcastingClasses.length > 1 ? true : false;
  // }

  getMultiClassSpellLevel( character: Character ) {
    let multiClassLevel = 0;
    character.classes.forEach( ( classAndLevel: ClassAndLevel ) => {
      switch ( classAndLevel.class ) {
        case 'bard':
        case 'cleric':
        case 'druid':
        case 'sorcerer':
        case 'wizard':
          multiClassLevel += classAndLevel.level;
          return;
        case 'paladin':
        case 'ranger':
          multiClassLevel += Math.floor( classAndLevel.level / 2 );
      }
    } );
    return multiClassLevel;
  }

  getMultiClassSpellSlots( multiClassSpellLevel: number ): number[] {
    const level = multiClassSpellLevel;
    let spellSlots: number[] = [];
    if ( level === 1 ) {
       spellSlots = [ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( level === 2 ) {
       spellSlots = [ 0, 3, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( level === 3 ) {
       spellSlots = [ 0, 4, 2, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( level === 4 ) {
       spellSlots = [ 0, 4, 3, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( level === 5 ) {
       spellSlots = [ 0, 4, 3, 2, 0, 0, 0, 0, 0, 0 ];
    }
    if ( level === 6 ) {
       spellSlots = [ 0, 4, 3, 3, 0, 0, 0, 0, 0, 0 ];
    }
    if ( level === 7 ) {
       spellSlots = [ 0, 4, 3, 3, 1, 0, 0, 0, 0, 0 ];
    }
    if ( level === 8 ) {
       spellSlots = [ 0, 4, 3, 3, 2, 0, 0, 0, 0, 0 ];
    }
    if ( level === 9 ) {
       spellSlots = [ 0, 4, 3, 3, 3, 1, 0, 0, 0, 0 ];
    }
    if ( level === 10 ) {
       spellSlots = [ 0, 4, 3, 3, 3, 2, 0, 0, 0, 0 ];
    }
    if ( level === 11 || level === 12 ) {
       spellSlots = [ 0, 4, 3, 3, 3, 2, 1, 0, 0, 0 ];
    }
    if ( level === 13 || level === 14 ) {
       spellSlots = [ 0, 4, 3, 3, 3, 2, 1, 1, 0, 0 ];
    }
    if ( level === 15 || level === 16 ) {
       spellSlots = [ 0, 4, 3, 3, 3, 2, 1, 1, 1, 0 ];
    }
    if ( level === 17 ) {
       spellSlots = [ 0, 4, 3, 3, 3, 2, 1, 1, 1, 1 ];
    }
    if ( level === 18 ) {
       spellSlots = [ 0, 4, 3, 3, 3, 3, 1, 1, 1, 1 ];
    }
    if ( level === 19 ) {
       spellSlots = [ 0, 4, 3, 3, 3, 3, 2, 1, 1, 1 ];
    }
    if ( level === 20 ) {
       spellSlots = [ 0, 4, 3, 3, 3, 3, 2, 2, 1, 1 ];
    }
    return spellSlots;
  }


  getSorcererSpellSlots( classLevel: ClassLevel ): number[] {
    let spellSlots: number[];
    if ( classLevel === 1 ) {
      spellSlots = [ 999, 2, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 2 ) {
      spellSlots = [ 999, 3, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 3 ) {
      spellSlots = [ 999, 4, 2, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 4 ) {
      spellSlots = [ 999, 4, 3, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 5 ) {
      spellSlots = [ 999, 4, 3, 2, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 6 ) {
      spellSlots = [ 999, 4, 3, 3, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 7 ) {
      spellSlots = [ 999, 4, 3, 3, 1, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 8 ) {
      spellSlots = [ 999, 4, 3, 3, 2, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 9 ) {
      spellSlots = [ 999, 4, 3, 3, 3, 1, 0, 0, 0, 0 ];
    }
    if ( classLevel === 10 ) {
      spellSlots = [ 999, 4, 3, 3, 3, 2, 0, 0, 0, 0 ];
    }
    if ( classLevel === 11 || classLevel === 12 ) {
      spellSlots = [ 999, 4, 3, 3, 3, 2, 1, 0, 0, 0 ];
    }
    if ( classLevel === 13 ) {
      spellSlots = [ 999, 4, 3, 3, 3, 2, 1, 1, 0, 0 ];
    }
    if ( classLevel === 14 ) {
      spellSlots = [ 999, 4, 3, 3, 3, 2, 1, 1, 0, 0 ];
    }
    if ( classLevel === 15 || classLevel === 16 ) {
      spellSlots = [ 999, 4, 3, 3, 3, 2, 1, 1, 1, 0 ];
    }
    if ( classLevel === 17 ) {
      spellSlots = [ 999, 4, 3, 3, 3, 2, 1, 1, 1, 1 ];
    }
    if ( classLevel === 18 ) {
      spellSlots = [ 999, 4, 3, 3, 3, 3, 1, 1, 1, 1 ];
    }
    if ( classLevel === 19 ) {
      spellSlots = [ 999, 4, 3, 3, 3, 3, 2, 1, 1, 1 ];
    }
    if ( classLevel === 20 ) {
      spellSlots = [ 999, 4, 3, 3, 3, 3, 2, 2, 1, 1 ];
    }
    return spellSlots;
  }
  getOtherSorcererSpellStats( classLevel: ClassLevel ): Partial<SpellStats> {
    let spellsKnownNumber: number;
    let cantripsKnownNumber: number;
    if ( classLevel === 1 ) {
      cantripsKnownNumber = 4;
      spellsKnownNumber = 2;
    }
    if ( classLevel === 2 ) {
      cantripsKnownNumber = 4;
      spellsKnownNumber = 3;
    }
    if ( classLevel === 3 ) {
      cantripsKnownNumber = 4;
      spellsKnownNumber = 4;
    }
    if ( classLevel === 4 ) {
      cantripsKnownNumber = 5;
      spellsKnownNumber = 5;
    }
    if ( classLevel === 5 ) {
      cantripsKnownNumber = 5;
      spellsKnownNumber = 6;
    }
    if ( classLevel === 6 ) {
      cantripsKnownNumber = 5;
      spellsKnownNumber = 7;
    }
    if ( classLevel === 7 ) {
      cantripsKnownNumber = 5;
      spellsKnownNumber = 8;
    }
    if ( classLevel === 8 ) {
      cantripsKnownNumber = 5;
      spellsKnownNumber = 9;
    }
    if ( classLevel === 9 ) {
      cantripsKnownNumber = 5;
      spellsKnownNumber = 10;
    }
    if ( classLevel === 10 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 11;
    }
    if ( classLevel === 11 || classLevel === 12 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 12;
    }
    if ( classLevel === 13 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 13;
    }
    if ( classLevel === 14 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 13;
    }
    if ( classLevel === 15 || classLevel === 16 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 14;
    }
    if ( classLevel === 17 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 15;
    }
    if ( classLevel === 18 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 15;
    }
    if ( classLevel === 19 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 15;
    }
    if ( classLevel === 20 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 15;
    }
    return { spellsKnownNumber, cantripsKnownNumber };
  }

  
  getPaladinSpellSlots( classLevel: ClassLevel): number[] {
    let spellSlots: number[];
    if ( classLevel === 1 ) {
      spellSlots = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 2 ) {
      spellSlots = [ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 3 || classLevel === 4 ) {
      spellSlots = [ 0, 3, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 5 || classLevel === 6 ) {
      spellSlots = [ 0, 4, 2, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 7 || classLevel === 8 ) {
      spellSlots = [ 0, 4, 3, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 9 || classLevel === 10 ) {
      spellSlots = [ 0, 4, 3, 2, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 11 || classLevel === 12 ) {
      spellSlots = [ 0, 4, 3, 3, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 13 || classLevel === 14 ) {
      spellSlots = [ 0, 4, 3, 3, 1, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 15 || classLevel === 16 ) {
      spellSlots = [ 0, 4, 3, 3, 2, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 17 || classLevel === 18 ) {
      spellSlots = [ 0, 4, 3, 3, 3, 1, 0, 0, 0, 0 ];
    }
    if ( classLevel === 19 || classLevel === 20 ) {
      spellSlots = [ 0, 4, 3, 3, 3, 2, 0, 0, 0, 0 ];
    }

    return spellSlots;
  }
  getOtherPaladinSpellStats( classLevel: ClassLevel, charismaModifier: number ): Partial<SpellStats> {
    const preparableSpells = Math.floor( charismaModifier + ( classLevel / 2 ) );
    const spellsKnownNumber = 'no limit';
    const cantripsKnownNumber = 0;
    return { spellsKnownNumber, preparableSpells, cantripsKnownNumber };
  }

  getSingleClassSpellStats( character: Character, className: ClassName ): Partial<SpellStats> {
    const index = findIndex( character.classes, o => o.class === className );
    const level = character.classes[ index ].level;
    let spellSlots: number[];
    let spellStats: Partial<SpellStats>;
    switch ( className ) {
      case 'bard':
        spellSlots = this.getBardSpellSlots( level );
        spellStats = this.getOtherBardSpellStats( level );
        return { ...spellStats, spellSlots };
      case 'cleric':
        spellSlots = this.getClericSpellSlots( level );
        spellStats = this.getOtherClericSpellStats( level );
        return { ...spellStats, spellSlots };
      case 'druid':
        spellSlots = this.getDruidSpellSlots( level );
        spellStats = this.getOtherDruidSpellStats( level );
        return { ...spellStats, spellSlots };
      case 'sorcerer':
        spellSlots = this.getSorcererSpellSlots( level );
        spellStats = this.getOtherSorcererSpellStats( level );
        return { ...spellStats, spellSlots };
      case 'wizard':
        spellSlots = this.getWizardSpellSlots( level );
        spellStats = this.getOtherWizardSpellStats( level );
        return { ...spellStats, spellSlots };
      case 'paladin':
        spellSlots = this.getPaladinSpellSlots( level );
        spellStats = this.getOtherPaladinSpellStats( level, character.abilityScores.charisma.modifier );
        return { ...spellStats, spellSlots };
      case 'ranger':
        spellSlots = this.getRangerSpellSlots( level );
        spellStats = this.getOtherRangerSpellStats( level );
        return { ...spellStats, spellSlots };
    }
  }



}


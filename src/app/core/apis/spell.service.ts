import { Character } from '../../characters/character-interfaces-and-types';
import { ClassName, ClassLevel, ClassAndLevel } from './../../classes/class-interfaces-and-types';
import { Spell, MagicSchool, MagicComponent, SpellLevel, SpellStats } from './../../spells/spell-interfaces-and-types';
// tslint:disable: no-switch-case-fall-through


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

  getMultiClassSpellSlots( multiClassSpellLevel: number ): SpellLevel[] {
    const multiClassSpellSlots: number[] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
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
    return [ ...multiClassSpellSlots ] as SpellLevel[];
  }

  
  getSorcererSpellSlots( classLevel: number ): SpellStats {
    let spellsPerLongRest: number[];
    let spellsKnownNumber: number;
    let cantripsKnownNumber: number;
    if ( classLevel === 1 ) {
      cantripsKnownNumber = 4;
      spellsKnownNumber = 2;
      spellsPerLongRest = [ 999, 2, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 1 ) {
      cantripsKnownNumber = 4;
      spellsKnownNumber = 2;
      spellsPerLongRest = [ 999, 2, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 2 ) {
      cantripsKnownNumber = 4;
      spellsKnownNumber = 3;
      spellsPerLongRest = [ 999, 3, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 3 ) {
      cantripsKnownNumber = 4;
      spellsKnownNumber = 4;
      spellsPerLongRest = [ 999, 4, 2, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 4 ) {
      cantripsKnownNumber = 5;
      spellsKnownNumber = 5;
      spellsPerLongRest = [ 999, 4, 3, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 5 ) {
      cantripsKnownNumber = 5;
      spellsKnownNumber = 6;
      spellsPerLongRest = [ 999, 4, 3, 2, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 6 ) {
      cantripsKnownNumber = 5;
      spellsKnownNumber = 7;
      spellsPerLongRest = [ 999, 4, 3, 3, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 7 ) {
      cantripsKnownNumber = 5;
      spellsKnownNumber = 8;
      spellsPerLongRest = [ 999, 4, 3, 3, 1, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 8 ) {
      cantripsKnownNumber = 5;
      spellsKnownNumber = 9;
      spellsPerLongRest = [ 999, 4, 3, 3, 2, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 9 ) {
      cantripsKnownNumber = 5;
      spellsKnownNumber = 10;
      spellsPerLongRest = [ 999, 4, 3, 3, 3, 1, 0, 0, 0, 0 ];
    }
    if ( classLevel === 10 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 11;
      spellsPerLongRest = [ 999, 4, 3, 3, 3, 2, 0, 0, 0, 0 ];
    }
    if ( classLevel === 11 || classLevel === 12 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 12;
      spellsPerLongRest = [ 999, 4, 3, 3, 3, 2, 1, 0, 0, 0 ];
    }
    if ( classLevel === 13 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 13;
      spellsPerLongRest = [ 999, 4, 3, 3, 3, 2, 1, 1, 0, 0 ];
    }
    if ( classLevel === 14 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 13;
      spellsPerLongRest = [ 999, 4, 3, 3, 3, 2, 1, 1, 0, 0 ];
    }
    if ( classLevel === 15 || classLevel === 16 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 14;
      spellsPerLongRest = [ 999, 4, 3, 3, 3, 2, 1, 1, 1, 0 ];
    }
    if ( classLevel === 17 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 15;
      spellsPerLongRest = [ 999, 4, 3, 3, 3, 2, 1, 1, 1, 1 ];
    }
    if ( classLevel === 18 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 15;
      spellsPerLongRest = [ 999, 4, 3, 3, 3, 3, 1, 1, 1, 1 ];
    }
    if ( classLevel === 19 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 15;
      spellsPerLongRest = [ 999, 4, 3, 3, 3, 3, 2, 1, 1, 1 ];
    }
    if ( classLevel === 20 ) {
      cantripsKnownNumber = 6;
      spellsKnownNumber = 15;
      spellsPerLongRest = [ 999, 4, 3, 3, 3, 3, 2, 2, 1, 1 ];
    }
    return { spellsKnownNumber, cantripsKnownNumber, spellsPerLongRest } as SpellStats;
  }

  getPaladinSpellSlots( classLevel: number, charismaModifier: number ): SpellStats {
    const preparableSpells = Math.floor( charismaModifier + ( classLevel / 2 ) );
    const spellsKnownNumber = 'no limit';
    const cantripsKnownNumber = 0;
    let spellsPerLongRest: number[];
    if ( classLevel === 1 ) {
      spellsPerLongRest = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 2 ) {
      spellsPerLongRest = [ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 3 || classLevel === 4 ) {
      spellsPerLongRest = [ 0, 3, 0, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 5 || classLevel === 6 ) {
      spellsPerLongRest = [ 0, 4, 2, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 7 || classLevel === 8 ) {
      spellsPerLongRest = [ 0, 4, 3, 0, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 9 || classLevel === 10 ) {
      spellsPerLongRest = [ 0, 4, 3, 2, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 11 || classLevel === 12 ) {
      spellsPerLongRest = [ 0, 4, 3, 3, 0, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 13 || classLevel === 14 ) {
      spellsPerLongRest = [ 0, 4, 3, 3, 1, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 15 || classLevel === 16 ) {
      spellsPerLongRest = [ 0, 4, 3, 3, 2, 0, 0, 0, 0, 0 ];
    }
    if ( classLevel === 17 || classLevel === 18 ) {
      spellsPerLongRest = [ 0, 4, 3, 3, 3, 1, 0, 0, 0, 0 ];
    }
    if ( classLevel === 19 || classLevel === 20 ) {
      spellsPerLongRest = [ 0, 4, 3, 3, 3, 2, 0, 0, 0, 0 ];
    }
 
    return { spellsKnownNumber, preparableSpells, cantripsKnownNumber, spellsPerLongRest } as SpellStats;
  }
}


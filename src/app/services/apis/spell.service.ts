// tslint:disable: no-switch-case-fall-through


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import {
  Class,
  MagicComponent,
  MagicSchool,
  Spell,
  SpellLevel,
  Time,
  TimeUnit,
  SpellStats,
} from '../../interfaces/character';

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
    let next = "https://api-beta.open5e.com/spells/?format=json&page=8";
    const spellsCollection = this.afs.collection<Spell>( 'spells' );

    this.http
      .get<any>( next )
      .subscribe( response => {
        console.log( response.next );
        const results: any[] = response.results;
        results.forEach( spell => {
          console.log( spell );
          const castingTime = this.getCastingTime( spell.casting_time );
          const classes: Class[] = spell.dnd_class.toLowerCase().split( ', ' );
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
    const classSpellSlots: number[] = [ 0, 2, 0, 0, 0, 0, 0, 0, 0 ];
    let spellsKnown = 2;
    let cantripsKnown = 4;
    switch ( true ) {
      case classLevel >= 2:
        spellsKnown = 3;
        classSpellSlots[ 1 ] = 3;
      case classLevel >= 3:
        spellsKnown = 4;
        classSpellSlots[ 1 ] = 4;
        classSpellSlots[ 2 ] = 2;
      case classLevel >= 4:
        cantripsKnown = 5;
        spellsKnown = 5;
        classSpellSlots[ 2 ] = 3;
      case classLevel >= 5:
        spellsKnown = 6;
        classSpellSlots[ 2 ] = 3;
        classSpellSlots[ 3 ] = 2;
      case classLevel >= 6:
        spellsKnown = 7;
        classSpellSlots[ 3 ] = 3;
      case classLevel >= 7:
        spellsKnown = 8;
        classSpellSlots[ 4 ] = 1;
      case classLevel >= 8:
        spellsKnown = 9;
        classSpellSlots[ 4 ] = 2;
      case classLevel >= 9:
        spellsKnown = 10;
        classSpellSlots[ 4 ] = 3;
        classSpellSlots[ 5 ] = 1;

      case classLevel >= 10:
        cantripsKnown = 6;
        spellsKnown = 11;
        classSpellSlots[ 5 ] = 2;
      case classLevel >= 11:
        spellsKnown = 12;
        classSpellSlots[ 6 ] = 1;
      case classLevel >= 12:
      //not an error - no changes happen here
      case classLevel >= 13:
        spellsKnown = 13;
        classSpellSlots[ 7 ] = 1;
      case classLevel >= 14:
      //not an error - no changes happen here

      case classLevel >= 15:
        spellsKnown = 14;
        classSpellSlots[ 8 ] = 1;
      case classLevel >= 16:
      //not an error - no changes happen here

      case classLevel >= 17:
        spellsKnown = 15;
        classSpellSlots[ 9 ] = 1;
      case classLevel >= 18:
        classSpellSlots[ 5 ] = 3;
      case classLevel >= 19:
        classSpellSlots[ 6 ] = 2;
      case classLevel >= 20:
        classSpellSlots[ 7 ] = 2;
      default:
        break;
    }
    return [ ...classSpellSlots ] as SpellLevel[];
  }
}


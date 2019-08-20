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
}


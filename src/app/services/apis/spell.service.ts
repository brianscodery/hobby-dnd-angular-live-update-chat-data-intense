import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Spell, Time } from '../../interfaces/character';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable( {
  providedIn: 'root'
} )
export class SpellService {
  spells: Spell[];
  spells$: Observable<any>;

  constructor ( private http: HttpClient, private afs: AngularFirestore ) {
    // this.addWeaponsToDB();
    // this.addArmourToDB();

    addSpellsToDB() {
      let next = "https://api-beta.open5e.com/spells/?format=json";
      while ( next ) {
        this.http
          .get<Spell>(next )
          .subscribe( spell => {
            const properties: WeaponProperty[] = [];
            this.getWeaponProperties( weapon, properties );
            this.renameCommaName( weapon )
            this.removeSpaceInName( weapon );
            const newWeapon = this.createNewWeaponFromApiData( weapon, properties );
            const weaponsCollection = this.afs.collection<Weapon>( 'weapons' );
            weaponsCollection.doc( weapon.name ).set( { ...newWeapon } );
          } );
      }
    }

    getCastingTime( castingTimeString: string ): Time{
      const index: number = castingTimeString.indexOf( ' ' );
      if ( index === -1 ) { return { denomination: castingTimeString };}
      const time = {
        quantity: castingTimeString.substring( 0, i + 1 ),
        denomination: castingTimeStringsubstring(index)
      }
    }
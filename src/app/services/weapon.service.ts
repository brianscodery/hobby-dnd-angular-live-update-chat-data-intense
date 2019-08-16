import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { Weapon, WeaponProperty, Armour } from './../interfaces/character';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable( {
  providedIn: 'root'
} )
export class WeaponService {
  weapons: Weapon[];
  weapons$: Observable<any>;

  constructor ( private http: HttpClient, private afs: AngularFirestore ) {
    // this.addWeaponsToDB();
    // this.addArmourToDB();
  }

  addWeaponsToDB() {
    for ( let i = 1; i <= 37; i++ ) {
      this.http
        .get<any[]>( 'http://www.dnd5eapi.co/api/equipment/' + i )
        .subscribe( weapon => {
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

  getWeaponProperties( weapon, properties ): void {
    if ( weapon.properties ) {
      weapon.properties.forEach( propertyObject => properties.push( propertyObject.name.toLowerCase() ) );
    }
  }
  
  renameCommaName( weapon ): void {
    if ( weapon.name.includes( ', ' ) ) {
      weapon.name = weapon.name.replace( ' ', '' );
      const splitArr = weapon.name.split( ',' );
      weapon.name = splitArr[ 1 ].toLowerCase() + splitArr[ 0 ].charAt( 0 ).toUpperCase() + splitArr[ 0 ].slice( 1 ).toLowerCase();
    }
  }
  
  removeSpaceInName( item ) {
    if ( item.name.includes( ' ' ) ) {
      const splitArr2 = item.name.split( ' ' );
      item.name = splitArr2[ 0 ].toLowerCase() + splitArr2[ 1 ].charAt( 0 ).toUpperCase() + splitArr2[ 1 ].slice( 1 ).toLowerCase();
    }
  }

  createNewWeaponFromApiData( weapon, properties ): Weapon {
    const newWeapon = new Weapon(
      weapon.name,
      weapon.weapon_range.toLowerCase(),
      weapon[ 'weapon_category:' ].toLowerCase(),
      { quantity: weapon.cost.quantity, denomination: weapon.cost.unit.toLowerCase() },
      weapon.weight,
      weapon.damage.damage_type.name.toLowerCase(),
      weapon.damage.dice_value,
      { normalRange: weapon.range.normal, longRange: weapon.range.long },
      properties );
    return newWeapon;
  }

  
  addArmourToDB() {
    for ( let i = 38; i <= 50; i++ ) {
      this.http
        .get<any[]>( 'http://www.dnd5eapi.co/api/equipment/' + i )
        .subscribe( armour => {
          const newArmour = new Armour(
            armour.name.toLowerCase(),
            armour.armor_category.toLowerCase(),
            { baseAC: armour.armor_class.base, dexBonus: armour.armor_class.dex_bonus, maxBonus: armour.armor_class.max_bonus },
            { denomination: armour.cost.unit, quantity: armour.cost.quantity },
            armour.weight,
            armour.stealth_disadvantage,
            armour.str_minimum,
          0);
          this.removeSpaceInName( newArmour );
          const armourCollection = this.afs.collection<Armour>( 'armour' );
          armourCollection.doc( newArmour.name ).set( { ...newArmour } );
        } );
    }
  }
}

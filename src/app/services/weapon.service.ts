import { HttpClient } from '@angular/common/http';
import { Weapon } from './../interfaces/character';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable( {
  providedIn: 'root'
} )
export class WeaponService {
  weapons: any[];
  weapons$: Observable<any>;

  constructor ( private http: HttpClient ) {
    for ( let i = 0; i < 50; i++ ) {
      this.http
        .get<any[]>( 'http://www.dnd5eapi.co/api/equipment/' + i )
        .subscribe( result => console.log( result ) );
    }
  }
}


//     const club = new Weapon( 'club', 'melee', 'simple', 2, 'bludgeoning', 4, [ 'light' ] );

//     const dagger = new Weapon( 'dagger', 'melee', 'simple', 1, 'piercing', 4, [ 'light', 'finesse', 'thrown' ],undefined,{normalRange:20,longRange: 60} );

// const greatClub = 
//     Greatclub	2 sp	1d8 bludgeoning	10 lb.Two - handed
//     Handaxe	5 gp	1d6 slashing	2 lb.Light, thrown(range 20 / 60)
//     Javelin	5 sp	1d6 piercing	2 lb.Thrown(range 30 / 120)
//     Light Hammer	2 gp	1d4 bludgeoning	2 lb.Light, thrown(range 20 / 60)
//     Mace	5 gp	1d6 bludgeoning	4 lb.—
//     Quarterstaff	2 sp	1d6 bludgeoning	4 lb.Versatile(1d8)
//     Sickle	1 gp	1d4 slashing	2 lb.Light
//     Spear	1 gp	1d6 piercing	3 lb.Thrown(range 20 / 60), versatile(1d8)
//     Simple Ranged Weapons
//     Crossbow, light
//     25 gp	1d8 piercing	5 lb.Ammunition(range 80 / 320), loading, two - handed
//     Dart	5 cp	1d4 piercing	1 / 4 lb.Finesse, thrown(range 20 / 60)
//     Shortbow	25 gp	1d6 piercing	2 lb.Ammunition(range 80 / 320), two - handed
//     Sling	1 sp	1d4 bludgeoning	—	Ammunition(range 30 / 120)
//     Martial Melee Weapons
//     Battleaxe	10 gp	1d8 slashing	4 lb.Versatile(1d10)
//     Flail	10 gp	1d8 bludgeoning	2 lb.—
//     Glaive	20 gp	1d10 slashing	6 lb.Heavy, reach, two - handed
//     Greataxe	30 gp	1d12 slashing	7 lb.Heavy, two - handed
//     Greatsword	50 gp	2d6 slashing	6 lb.Heavy, two - handed
//     Halberd	20 gp	1d10 slashing	6 lb.Heavy, reach, two - handed
//     Lance	10 gp	1d12 piercing	6 lb.Reach, special
//     Longsword	15 gp	1d8 slashing	3 lb.Versatile(1d10)
//     Maul	10 gp	2d6 bludgeoning	10 lb.Heavy, two - handed
//     Morningstar	15 gp	1d8 piercing	4 lb.—
//     Pike	5 gp	1d10 piercing	18 lb.Heavy, reach, two - handed
//     Rapier	25 gp	1d8 piercing	2 lb.Finesse
//     Scimitar	25 gp	1d6 slashing	3 lb.Finesse, light
//     Shortsword	10 gp	1d6 piercing	2 lb.Finesse, light
//     Trident	5 gp	1d6 piercing	4 lb.Thrown(range 20 / 60), versatile(1d8)
//     War Pick	5 gp	1d8 piercing	2 lb.—
//     Warhammer	15 gp	1d8 bludgeoning	2 lb.Versatile(1d10)
//     Whip	2 gp	1d4 slashing	3 lb.Finesse, reach
//     Martial Ranged Weapons
//     Blowgun	10 gp	1 piercing	1 lb.Ammunition(range 25 / 100), loading
//     Crossbow, hand	75 gp	1d6 piercing	3 lb.Ammunition(range 30 / 120), light, loading
//     Crossbow, heavy	50 gp	1d10 piercing	18 lb.Ammunition(range 100 / 400), heavy, loading, two - handed
//     Longbow	50 gp	1d8 piercing	2 lb.Ammunition(range 150 / 600), heavy, two - handed
//     Net	1 gp	—	3 lb.Special, thrown(range 5 / 15)


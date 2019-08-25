import {Injectable} from '@angular/core';

import {DieNumber} from '../shared/common-interfaces-and-types';
import {ProficiencyBonusOption} from './../abilities/abilityInterfacesAndTypes';
import {ClassLevel} from './class-interfaces-and-types';


export interface MartialArtsDie {
  die: DieNumber;
  quantity: number;
}

export interface MonkLevelDefinition {
  level: ClassLevel;
  martialArtsDie: MartialArtsDie;
  proficiencyBonus: ProficiencyBonusOption;
  kiPoints: number;
  unarmouredMovementBonus: number;
  featuresGained: string[];
  decisionPoints?: string[];
}
export const MONK_DEFINITION_PER_LEVEL: MonkLevelDefinition[] = [
  {
    level: 1,
    martialArtsDie: { die: 4, quantity: 1 },
    proficiencyBonus: 2,
    kiPoints: 0,
    unarmouredMovementBonus: 0,
    featuresGained: [ 'unarmouredDefense', 'martialArts' ],
  },
  {
    level: 2,
    martialArtsDie: { die: 4, quantity: 1 },
    proficiencyBonus: 2,
    kiPoints: 2,
    unarmouredMovementBonus: 10,
    featuresGained: [ 'ki', 'unarmouredMovement' ],
  },
  {
    level: 3,
    martialArtsDie: { die: 4, quantity: 1 },
    proficiencyBonus: 2,
    kiPoints: 3,
    unarmouredMovementBonus: 10,
    featuresGained: [ 'deflectMissiles' ],
    decisionPoints: [ 'monasticTradition' ],
  },
  {
    level: 4,
    martialArtsDie: { die: 4, quantity: 1 },
    proficiencyBonus: 2,
    kiPoints: 4,
    unarmouredMovementBonus: 10,
    featuresGained: [ 'slowFall' ],
    decisionPoints: [ 'abilityScore' ]
  },
];



@Injectable( {
  providedIn: 'root'
} )
export class MonkService {



  constructor () { }
}

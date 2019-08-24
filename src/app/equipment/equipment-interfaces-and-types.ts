export interface EquipmentInterfacesAndTypes {
}


export const TREASURES_IN_ORDER = [ 'cp', 'sp', 'ep', 'gp', 'pp' ];


export interface Treasures {
  cp: number;
  sp: number;
  ep: number;
  gp: number;
  pp: number;
}

export type Treasure = 'cp' | 'sp' | 'ep' | 'gp' | 'pp';

export interface EquipmentItem {
  name: string;
  description: string;
  quantity?: number;
}
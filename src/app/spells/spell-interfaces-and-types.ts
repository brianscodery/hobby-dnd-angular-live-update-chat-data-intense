import { Time } from '../shared/common-interfaces-and-types';
import { ClassName } from '../classes/class-interfaces-and-types';

export interface SpellStats {
  spellsKnownNumber?: number | 'no limit';
  cantripsKnownNumber?: number;
  spellsPerLongRest?: number[];
  spellsRemaining?: number[];
  multiClassSpellsPerDay?: number[];
  spells?: string[];
  preparableSpells?: number;
  preparedSpells?: string[];
}

export type MagicSchool =
  | 'abjuration'
  | 'conjuration'
  | 'divination'
  | 'enchantment'
  | 'evocation'
  | 'illusion'
  | 'necromancy'
  | 'transmutation';



export interface Spell {
  castingTime: Time;
  classes: ClassName[];
  components: MagicComponent[];
  concentration: boolean;
  description: string[];
  duration: string;
  level: SpellLevel;
  name: string;
  page: string;
  range: string;
  ritual: boolean;
  school: MagicSchool;
  material?: string;
  higherLevels?: string;
  archetype?: string;
  circles?: string;
}

export type MagicComponent = 'verbal' | 'somatic' | 'material';


export type SpellLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;




export const SPELLCASTER_CLASSES = [
  'bard',
  'cleric',
  'druid',
  'sorcerer',
  'wizard',
  'paladin',
  'ranger'
];
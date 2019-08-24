export interface SpellInterfacesAndTypes {
}

export interface SpellStats {
  spellsKnownNumber?: number | 'no limit';
  cantripsKnownNumber?: number;
  spellsPerLongRest?: SpellLevel[];
  spellsRemaining?: SpellLevel[];
  multiClassSpellsPerDay?: SpellLevel[];
  spells?: string[];
  preparableSpells?: number;
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
  classes: Class[];
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

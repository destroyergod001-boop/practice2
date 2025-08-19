import { DEFAULT_STATS, DEFAULT_ELEMENTS } from './constants';

export interface PlayerProfile {
  id: number;
  name: string;
  gender: "male" | "female" | "other";
  level: number;
  currentXp: number;
  newClassId: number;
  newRaceId: number;
  oldClassIds: string;
  oldRaceIds: string;
  inventoryId: number;
  equipmentId: number;
  skills: string;
  abilities: string;
  gold: number;
  current_node_id: number;
}

export interface PlayerProfileModel {
  id: number;
  name: string;
  gender: "male" | "female" | "other";
  level: number;
  currentXp: number;
  newClassId: number;
  newRaceId: number;
  oldClassIds: number[];
  oldRaceIds: number[];
  inventoryId: number;
  equipmentId: number;
  skills: number[];
  abilities: number[];
  gold: number;
  current_node_id: number;
}

export interface PlayerProfileDTOFromApi {
  id: number;
  name: string;
  gender?: string;
  level?: number;
  current_xp?: number;
  new_class_id?: number;
  new_race_id?: number;
  old_class_ids?: string;
  old_race_ids?: string;
  inventory_id?: number;
  equipment_id?: number;
  skills?: string;
  abilities?: string;
  gold?: number;
  current_node_id?: number;
}
export interface TotalStats {
  HP: number;
  MP: number;
  STR: number;
  DEX: number;
  INT: number;
  WIS: number;
  CON: number;
  AGI: number;
  LUK: number;
  CHA: number;
  magic_armor: number;
  physical_armor: number;

  Fire_mastery: number;
  Water_mastery: number;
  Air_mastery: number;
  Earth_mastery: number;
  Wood_mastery: number;
  Metal_mastery: number;
  Light_mastery: number;
  Dark_mastery: number;
  Ice_mastery: number;
  Thunder_mastery: number;
  Life_mastery: number;
  Death_mastery: number;
  Physical_mastery: number;
  Magical_mastery: number;
  Void_mastery: number;
  Chaos_mastery: number;

  Fire_resist: number;
  Water_resist: number;
  Air_resist: number;
  Earth_resist: number;
  Wood_resist: number;
  Metal_resist: number;
  Light_resist: number;
  Dark_resist: number;
  Ice_resist: number;
  Thunder_resist: number;
  Life_resist: number;
  Death_resist: number;
  Physical_resist: number;
  Magical_resist: number;
  Void_resist: number;
  Chaos_resist: number;
}

// Helper function to get default player profile data
export const getDefaultPlayerProfileData = (): Partial<PlayerProfileModel> => ({
  name: '',
  gender: 'male',
  level: 1,
  currentXp: 0,
  newClassId: 0,
  newRaceId: 0,
  oldClassIds: [],
  oldRaceIds: [],
  inventoryId: 0,
  equipmentId: 0,
  skills: [],
  abilities: [],
  gold: 0,
  current_node_id: 1
});

// Helper function to get default total stats
export const getDefaultTotalStats = (): TotalStats => ({
  HP: 100,
  MP: 50,
  ...DEFAULT_STATS,
  magic_armor: 0,
  physical_armor: 0,
  
  // Element mastery
  Fire_mastery: 0,
  Water_mastery: 0,
  Air_mastery: 0,
  Earth_mastery: 0,
  Wood_mastery: 0,
  Metal_mastery: 0,
  Light_mastery: 0,
  Dark_mastery: 0,
  Ice_mastery: 0,
  Thunder_mastery: 0,
  Life_mastery: 0,
  Death_mastery: 0,
  Physical_mastery: 0,
  Magical_mastery: 0,
  Void_mastery: 0,
  Chaos_mastery: 0,
  
  // Element resistance
  Fire_resist: 0,
  Water_resist: 0,
  Air_resist: 0,
  Earth_resist: 0,
  Wood_resist: 0,
  Metal_resist: 0,
  Light_resist: 0,
  Dark_resist: 0,
  Ice_resist: 0,
  Thunder_resist: 0,
  Life_resist: 0,
  Death_resist: 0,
  Physical_resist: 0,
  Magical_resist: 0,
  Void_resist: 0,
  Chaos_resist: 0
});

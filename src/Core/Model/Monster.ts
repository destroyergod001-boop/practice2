import { DEFAULT_STATS, DEFAULT_ELEMENTS, getDefaultModelData } from './constants';

export interface Monster {
  id: number;
  name: string;
  description: string;
  tier: number;
  level: number;
  xp: number;
  gold: number;
  basic_ability_id: number;
  basic_skill_ids: string;
  basic_stats: string;
  element_mastery: string;
  element_resistance: string;
  drop_item_ids: string;
  asset_location?: string;
}

export interface MonsterModel {
  id: number;
  name: string;
  description: string;
  tier: number;
  level: number;
  xp: number;
  gold: number;
  basic_ability_id: number;
  basic_skill_ids: number[];
  basic_stats: Record<string, number>;
  element_mastery: Record<string, number>;
  element_resistance: Record<string, number>;
  drop_item_ids: Record<string, number>;
  asset_location?: string;
}

export interface MonsterDTOFromApi {
  id: number;
  name: string;
  description?: string;
  tier?: number;
  level?: number;
  xp?: number;
  gold?: number;
  basic_ability_id?: number;
  basic_skill_ids?: string;
  basic_stats?: string;
  element_mastery?: string;
  element_resistance?: string;
  drop_item_ids?: string;
  asset_location?: string;
}

// Helper function to get default monster data
export const getDefaultMonsterData = (): Partial<MonsterModel> => ({
  name: '',
  description: '',
  tier: 1,
  level: 1,
  xp: 0,
  gold: 0,
  basic_ability_id: 0,
  basic_skill_ids: [],
  drop_item_ids: {},
  ...getDefaultModelData<MonsterModel>(),
  asset_location: ''
});
import { DEFAULT_STATS, DEFAULT_ELEMENTS, getDefaultModelData } from './constants';

export interface Ability {
  id: number;
  name: string;
  description: string;
  tier: number;
  category: string;
  turn: number;
  gold: number;
  level: number;
  basic_effect_fixed_value: number;
  basic_effect_percentage_value: number;
  monster_id: number;
  monster_number: number;
  elements: string;
  basic_stats: string;
  requirement_stats: string;
  element_mastery: string;
  element_resistance: string;
  requirement_element_mastery: string;
  requirement_element_resistance: string;
  requirement_item: number;
  asset_location: string;
}

export interface AbilityModel {
  id: number;
  name: string;
  description: string;
  tier: number;
  category: string;
  turn: number;
  gold: number;
  level: number;
  basic_effect_fixed_value: number;
  basic_effect_percentage_value: number;
  monster_id: number;
  monster_number: number;
  elements: Record<string, number>;
  basic_stats: Record<string, number>;
  requirement_stats: Record<string, number>;
  element_mastery: Record<string, number>;
  element_resistance: Record<string, number>;
  requirement_element_mastery: Record<string, number>;
  requirement_element_resistance: Record<string, number>;
  requirement_item?: number;
  asset_location?: string;
}

// Helper function to get default ability data
export const getDefaultAbilityData = (): Partial<AbilityModel> => ({
  name: '',
  description: '',
  tier: 1,
  category: 'single',
  turn: 1,
  gold: 0,
  level: 1,
  basic_effect_fixed_value: 0,
  basic_effect_percentage_value: 0,
  monster_id: 0,
  monster_number: 0,
  elements: { ...DEFAULT_ELEMENTS },
  ...getDefaultModelData<AbilityModel>(),
  asset_location: ''
});

export interface AbilityDTOFromApi {
  id: number;
  name: string;
  description?: string;
  tier?: number;
  category?: string;
  turn?: number;
  gold?: number;
  level?: number;
  basic_effect_fixed_value?: number;
  basic_effect_percentage_value?: number;
  monster_id?: number;
  monster_number?: number;
  elements?: string;
  basic_stats?: string;
  requirement_stats?: string;
  element_mastery?: string;
  element_resistance?: string;
  requirement_element_mastery?: string;
  requirement_element_resistance?: string;
  requirement_item?: number | null;
  asset_location?: string;
}
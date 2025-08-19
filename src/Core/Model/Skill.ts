import {   getDefaultModelData } from './constants';

export interface Skill {
  id: number;
  name: string;
  description: string;
  tier: number;
  category: string;
  costType: string;
  cost: number;
  turn: number;
  gold: number;
  level: number;
  basicType:string;
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
  requirement_item?: number;
  asset_location: string;
}

export interface SkillModel {
  id: number;
  name: string;
  description: string;
  tier: number;
  category: string;
  costType: string;
  basicType:string;
  cost: number;
  turn: number;
  gold: number;
  level: number;
  basic_effect_fixed_value: number;
  basic_effect_percentage_value: number;
  monster_id: number;
  monster_number: number;
  elements: string;
  basic_stats: Record<string, number>;
  requirement_stats: Record<string, number>;
  element_mastery: Record<string, number>;
  element_resistance: Record<string, number>;
  requirement_element_mastery: Record<string, number>;
  requirement_element_resistance: Record<string, number>;
  requirement_item?: number;
  asset_location?: string;
}

export interface SkillDTOFromApi {
  id: number;
  name: string;
  description?: string;
  tier?: number;
  category?: string;
  costType?: string;
  cost?: number;
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

// Helper function to get default skill data
export const getDefaultSkillData = (): Partial<SkillModel> => ({
  name: '',
  description: '',
  tier: 1,
  category: 'single',
  costType: 'MP',
  basicType:"Physical",
  cost: 0,
  turn: 1,
  gold: 0,
  level: 1,
  basic_effect_fixed_value: 0,
  basic_effect_percentage_value: 0,
  monster_id: 0,
  monster_number: 0,
  elements: "Physical",
  ...getDefaultModelData<SkillModel>(),
  asset_location: ''
});
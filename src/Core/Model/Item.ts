import {  getDefaultModelData } from './constants';

export interface Item {
  id: number;
  name: string;
  description: string;
  tier: number;
  wareableLocation: string;
  item_type: string;
  magic_armor: number;
  physical_armor: number;
  basic_ability_id: number;
  basic_skill_ids: string;
  basic_stats: string;
  requirement_stats: string;
  element_mastery: string;
  element_resistance: string;
  requirement_element_mastery: string;
  requirement_element_resistance: string;
  requirement_item?: number;
  asset_location: string;
}

export interface ItemModel {
  id: number;
  name: string;
  description: string;
  tier: number;
  wareableLocation: string;
  item_type: string;
  magic_armor: number;
  physical_armor: number;
  basic_ability_id: number;
  basic_skill_ids: number[];
  basic_stats: Record<string, number>;
  requirement_stats: Record<string, number>;
  element_mastery: Record<string, number>;
  element_resistance: Record<string, number>;
  requirement_element_mastery: Record<string, number>;
  requirement_element_resistance: Record<string, number>;
  requirement_item?: number;
  asset_location?: string;
}

export interface ItemDTOFromApi {
  id: number;
  name: string;
  description?: string;
  tier?: number;
  wareableLocation?: string;
  item_type?: string;
  magic_armor?: number;
  physical_armor?: number;
  basic_ability_id?: number;
  basic_skill_ids?: string;
  basic_stats?: string;
  requirement_stats?: string;
  element_mastery?: string;
  element_resistance?: string;
  requirement_element_mastery?: string;
  requirement_element_resistance?: string;
  requirement_item?: number | null;
  asset_location?: string;
}

// Helper function to get default item data
export const getDefaultItemData = (): Partial<ItemModel> => ({
  name: '',
  description: '',
  tier: 1,
  wareableLocation: '',
  item_type: '',
  magic_armor: 0,
  physical_armor: 0,
  basic_ability_id: 0,
  basic_skill_ids: [],
  ...getDefaultModelData<ItemModel>(),
  asset_location: ''
});
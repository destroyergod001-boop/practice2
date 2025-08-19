import {  getDefaultModelData } from './constants';

export interface Occupation {
  id: number;
  name: string;
  description: string;
  tier: number;
  basic_ability_id: number;
  basic_stats: string;
  requirement_stats: string;
  element_mastery: string;
  element_resistance: string;
  requirement_element_mastery: string;
  requirement_element_resistance: string;
  requirement_item?: number;
  asset_location: string;
}

export interface OccupationModel {
  id: number;
  name: string;
  description: string;
  tier: number;
  basic_ability_id: number;
  basic_stats: Record<string, number>;
  requirement_stats: Record<string, number>;
  element_mastery: Record<string, number>;
  element_resistance: Record<string, number>;
  requirement_element_mastery: Record<string, number>;
  requirement_element_resistance: Record<string, number>;
  requirement_item?: number;
  asset_location?: string;
}

export interface OccupationDTOFromApi {
  id: number;
  name: string;
  description?: string;
  tier?: number;
  basic_ability_id?: number;
  basic_stats?: string;
  requirement_stats?: string;
  element_mastery?: string;
  element_resistance?: string;
  requirement_element_mastery?: string;
  requirement_element_resistance?: string;
  requirement_item?: number | null;
  asset_location?: string;
}

// Helper function to get default occupation data
export const getDefaultOccupationData = (): Partial<OccupationModel> => ({
  name: '',
  description: '',
  tier: 1,
  basic_ability_id: 0,
  ...getDefaultModelData<OccupationModel>(),
  asset_location: ''
});
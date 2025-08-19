import { getDefaultModelData } from './constants';

export interface Race {
  id: number;
  name: string;
  description: string;
  tier: number;
  basic_stats: string;
  requirement_stats: string;
  element_mastery: string;
  element_resistance: string;
  requirement_element_mastery: string;
  requirement_element_resistance: string;
  requirement_item?: number;
  asset_location: string;
  basic_ability_id?: number | null;
}

export interface RaceModel {
  id: number;
  name: string;
  description: string;
  tier: number;
  basic_stats: Record<string, number>;
  requirement_stats: Record<string, number>;
  element_mastery: Record<string, number>;
  element_resistance: Record<string, number>;
  requirement_element_mastery: Record<string, number>;
  requirement_element_resistance: Record<string, number>;
  requirement_item?: number;
  asset_location?: string;
  basic_ability_id?: number | null;
}

export interface RaceDTOFromApi {
  id: number;
  name: string;
  description?: string;
  tier?: number;
  basic_stats?: string;
  requirement_stats?: string;
  element_mastery?: string;
  element_resistance?: string;
  requirement_element_mastery?: string;
  requirement_element_resistance?: string;
  requirement_item?: number | null;
  asset_location?: string;
  basic_ability_id?: number | null;
}

// Helper function to get default race data
export const getDefaultRaceData = (): Partial<RaceModel> => ({
  name: '',
  description: '',
  tier: 1,
  basic_ability_id: 0,
  ...getDefaultModelData<RaceModel>(),
  asset_location: ''
});
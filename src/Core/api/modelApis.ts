// src/Core/modelApis.ts
/**
 * Central registry for all model APIs
 * This file creates and exports TableApi instances for all models,
 * using the jsonFieldHandler for automatic JSON field processing.
 */

import { TableApi } from './tableApi';

// Import all model types
import { AbilityDTOFromApi, AbilityModel } from '../Model/Ability';
import { ItemDTOFromApi, ItemModel } from '../Model/Item';
import { MonsterDTOFromApi, MonsterModel } from '../Model/Monster';
import { SkillDTOFromApi, SkillModel } from '../Model/Skill';
import { StatDTOFromApi, StatModel } from '../Model/Stats';
import { ElementDTOFromApi, ElementModel } from '../Model/Elements';
import { RaceDTOFromApi, RaceModel } from '../Model/Race';
import { OccupationDTOFromApi, OccupationModel } from '../Model/Occupation';
import { ShopDTOFromApi, ShopModel } from '../Model/Shop';
import { StoryDTOFromApi, StoryModel } from '../Model/Story';
import { VilleinDTOFromApi, VilleinModel } from '../Model/Villein';
import { PlayerProfileDTOFromApi, PlayerProfileModel } from '../Model/PlayerProfile';
import { InventoryDTOFromApi, InventoryModel } from '../Model/PlayerInventory';
import { PlayerEquipmentProfileDTOFromApi, PlayerEquipmentProfileModel } from '../Model/playerEquipmentProfile';

// Create and export all model APIs
export const abilitiesApi = new TableApi<AbilityDTOFromApi, AbilityModel>({
  basePath: '/abilities',
  tableName: 'abilities'
});

export const itemsApi = new TableApi<ItemDTOFromApi, ItemModel>({
  basePath: '/items',
  tableName: 'items'
});

export const monstersApi = new TableApi<MonsterDTOFromApi, MonsterModel>({
  basePath: '/monsters',
  tableName: 'monsters'
});

export const skillsApi = new TableApi<SkillDTOFromApi, SkillModel>({
  basePath: '/skills',
  tableName: 'skills'
});

export const statsApi = new TableApi<StatDTOFromApi, StatModel>({
  basePath: '/stats',
  tableName: 'stats'
});

export const elementsApi = new TableApi<ElementDTOFromApi, ElementModel>({
  basePath: '/elements',
  tableName: 'elements'
});

export const racesApi = new TableApi<RaceDTOFromApi, RaceModel>({
  basePath: '/races',
  tableName: 'Race'
});

export const occupationsApi = new TableApi<OccupationDTOFromApi, OccupationModel>({
  basePath: '/occupations',
  tableName: 'occupations'
});

export const shopsApi = new TableApi<ShopDTOFromApi, ShopModel>({
  basePath: '/shops',
  tableName: 'shops'
});

export const storiesApi = new TableApi<StoryDTOFromApi, StoryModel>({
  basePath: '/stories',
  tableName: 'Story'
});

export const villeinsApi = new TableApi<VilleinDTOFromApi, VilleinModel>({
  basePath: '/villeins',
  tableName: 'Villein'
});

export const playerProfilesApi = new TableApi<PlayerProfileDTOFromApi, PlayerProfileModel>({
  basePath: '/player-profiles',
  tableName: 'PlayerProfile'
});

export const inventoriesApi = new TableApi<InventoryDTOFromApi, InventoryModel>({
  basePath: '/inventories',
  tableName: 'Inventory'
});

export const playerEquipmentProfilesApi = new TableApi<PlayerEquipmentProfileDTOFromApi, PlayerEquipmentProfileModel>({
  basePath: '/player-equipment-profiles',
  tableName: 'player_equipment_profiles'
});

// Export a registry object for dynamic access if needed
export const modelApis = {
  abilities: abilitiesApi,
  items: itemsApi,
  monsters: monstersApi,
  skills: skillsApi,
  stats: statsApi,
  elements: elementsApi,
  races: racesApi,
  occupations: occupationsApi,
  shops: shopsApi,
  stories: storiesApi,
  villeins: villeinsApi,
  playerProfiles: playerProfilesApi,
  inventories: inventoriesApi,
  playerEquipmentProfiles: playerEquipmentProfilesApi
} as const;

// Type for model API keys
export type ModelApiKey = keyof typeof modelApis;

// Helper function to get API by key
export function getModelApi<K extends ModelApiKey>(key: K): typeof modelApis[K] {
  return modelApis[key];
}
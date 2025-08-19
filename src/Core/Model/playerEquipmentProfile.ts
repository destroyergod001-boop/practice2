export interface PlayerEquipmentProfile {
  id: number;
  playerId: number;
  headItemId?: number;
  chestItemId?: number;
  legItemId?: number;
  feetItemId?: number;
  weaponItemId?: number;
  offhandItemId?: number;
  rightRingItemId?: number;
  leftRingItemId?: number;
  accessoryItemId?: number;
  potionSlot1: number[];
  potionSlot2: number[];
}

export interface PlayerEquipmentProfileModel {
  id: number;
  playerId: number;
  headItemId?: number;
  chestItemId?: number;
  legItemId?: number;
  feetItemId?: number;
  weaponItemId?: number;
  offhandItemId?: number;
  rightRingItemId?: number;
  leftRingItemId?: number;
  accessoryItemId?: number;
  potionSlot1: number[];
  potionSlot2: number[];
}

export interface PlayerEquipmentProfileDTOFromApi {
  id: number;
  player_id: number;
  head_item_id?: number | null;
  chest_item_id?: number | null;
  leg_item_id?: number | null;
  feet_item_id?: number | null;
  weapon_item_id?: number | null;
  offhand_item_id?: number | null;
  right_ring_item_id?: number | null;
  left_ring_item_id?: number | null;
  accessory_item_id?: number | null;
  potion_item_id1?: string;
  potion_item_id2?: string;
}

// Helper function to get default player equipment profile data
export const getDefaultPlayerEquipmentProfileData = (): Partial<PlayerEquipmentProfileModel> => ({
  playerId: 0,
  headItemId: undefined,
  chestItemId: undefined,
  legItemId: undefined,
  feetItemId: undefined,
  weaponItemId: undefined,
  offhandItemId: undefined,
  rightRingItemId: undefined,
  leftRingItemId: undefined,
  accessoryItemId: undefined,
  potionSlot1: [],
  potionSlot2: []
});
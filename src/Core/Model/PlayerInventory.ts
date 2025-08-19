export interface Inventory {
  id: number;
  player_id: number;
  item_ids: string;
}

export interface InventoryModel {
  id: number;
  player_id: number;
  item_ids: Record<string, number>;
}

export interface InventoryDTOFromApi {
  id: number;
  player_id: number;
  item_ids?: string;
}

// Helper function to get default inventory data
export const getDefaultInventoryData = (): Partial<InventoryModel> => ({
  player_id: 0,
  item_ids: {}
});
export interface Shop {
  id: number;
  name: string;
  description: string;
  items_ids: string;
  buy_rate: number;
  sell_rate: number;
  asset_location: string;
}

export interface ShopModel {
  id: number;
  name: string;
  description: string;
  items_ids: number[];
  buy_rate: number;
  sell_rate: number;
  asset_location?: string;
}

export interface ShopDTOFromApi {
  id: number;
  name: string;
  description?: string;
  items_ids?: string;
  buy_rate?: number;
  sell_rate?: number;
  asset_location?: string;
}

// Helper function to get default shop data
export const getDefaultShopData = (): Partial<ShopModel> => ({
  name: '',
  description: '',
  items_ids: [],
  buy_rate: 1.0,
  sell_rate: 0.5,
  asset_location: ''
});
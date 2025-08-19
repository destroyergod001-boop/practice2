export interface Story {
  id: number;
  name: string;
  type: "Intro" | "Battle" | "Shop" | "End";
  title: string;
  description: string;
  next_nodes_ids: string;
  shop_id?: number;
  battle_win_id?: number;
  battle_lose_id?: number;
  battle_escape?: number;
  monster_ids: string;
  asset_location?: string;
}

export interface StoryModel {
  id: number;
  name: string;
  type: "Intro" | "Battle" | "Shop" | "End";
  title: string;
  description: string;
  next_nodes_ids: Record<string, number>;
  shop_id?: number;
  battle_win_id?: number;
  battle_lose_id?: number;
  battle_escape?: number;
  monster_ids: number[];
  asset_location?: string;
}

export interface StoryDTOFromApi {
  id: number;
  name: string;
  type?: string;
  title?: string;
  description?: string;
  next_nodes_ids?: string;
  shop_id?: number | null;
  battle_win_id?: number | null;
  battle_lose_id?: number | null;
  battle_escape?: number | null;
  monster_ids?: string;
  asset_location?: string;
}

// Helper function to get default story data
export const getDefaultStoryData = (): Partial<StoryModel> => ({
  name: '',
  type: 'Intro',
  title: '',
  description: '',
  next_nodes_ids: {},
  monster_ids: [],
  asset_location: ''
});
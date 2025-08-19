export interface Element {
  id: number;
  name: string;
  description: string;
  weakness_id1: number;
  weakness_id2: number;
  color: string;
}

export interface ElementModel {
  id: number;
  name: string;
  description: string;
  weakness_id1: number;
  weakness_id2: number;
  color: string;
}

export interface ElementDTOFromApi {
  id: number;
  name: string;
  description?: string;
  weakness_id1?: number;
  weakness_id2?: number;
  color?: string;
}

// Helper function to get default element data
export const getDefaultElementData = (): Partial<ElementModel> => ({
  name: '',
  description: '',
  weakness_id1: 0,
  weakness_id2: 0,
  color: ''
});
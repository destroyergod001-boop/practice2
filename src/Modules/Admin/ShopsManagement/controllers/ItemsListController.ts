import { useState, useEffect, useMemo } from 'react';
import { ShopModel, ShopDTOFromApi } from '@core/Model/Shop';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { shopsApi } from '@core/api/modelApis';


export type SortField = 'name' | 'tier' | 'shop_type';
export type SortDirection = 'asc' | 'desc';

export interface ShopsListState {
  shops: ShopModel[];
  loading: boolean;
  searchQuery: string;
  sortField: SortField;
  sortDirection: SortDirection;
  currentPage: number;
  shopsPerPage: number;
}

export class ShopsListController {
  private setState: React.Dispatch<React.SetStateAction<ShopsListState>>;
  protected shopHelper: SimpleModelHelper<ShopDTOFromApi, ShopModel>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<ShopsListState>>) {
    this.setState = setState;
    this.shopHelper = new SimpleModelHelper<ShopDTOFromApi, ShopModel>(shopsApi);
  }
  
  async loadShops() {
    
    try {
      this.setState(prev => ({ ...prev, loading: true }));
      const data = await this.shopHelper.getAll();
      this.setState(prev => ({ ...prev, shops: data, loading: false }));
    } catch (error) {
      console.error('Failed to load shops:', error);
      this.setState(prev => ({ ...prev, shops: [], loading: false }));
    }
  }

  async deleteShop(id: number) {
    try {
      await this.shopHelper.delete(id);
      await this.loadShops();
      return true;
    } catch (error) {
      console.error('Failed to delete shop:', error);
      return false;
    }
  }

  setSearchQuery(query: string) {
    this.setState(prev => ({ ...prev, searchQuery: query, currentPage: 1 }));
  }

  setSorting(field: SortField, direction: SortDirection) {
    this.setState(prev => ({ ...prev, sortField: field, sortDirection: direction }));
  }

  setCurrentPage(page: number) {
    this.setState(prev => ({ ...prev, currentPage: page }));
  }

  setShopsPerPage(shopsPerPage: number) {
    this.setState(prev => ({ ...prev, shopsPerPage, currentPage: 1 }));
  }

  getFilteredAndSortedShops(state: ShopsListState): ShopModel[] {
    let filtered = state.shops;

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(shop =>
        shop.name.toLowerCase().includes(query) ||
        shop.description.toLowerCase().includes(query) ||
        shop.shop_type.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[state.sortField];
      let bValue: any = b[state.sortField];

      if (state.sortField === 'name' || state.sortField === 'shop_type') {
        aValue = (aValue as string).toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return state.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return state.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }

  getPaginatedShops(filteredShops: ShopModel[], state: ShopsListState): ShopModel[] {
    const startIndex = (state.currentPage - 1) * state.shopsPerPage;
    const endIndex = startIndex + state.shopsPerPage;
    return filteredShops.slice(startIndex, endIndex);
  }

  getTotalPages(filteredShops: ShopModel[], state: ShopsListState): number {
    return Math.ceil(filteredShops.length / state.shopsPerPage);
  }
}

export const useShopsListController = () => {
  const [state, setState] = useState<ShopsListState>({
    shops: [],
    loading: true,
    searchQuery: '',
    sortField: 'name',
    sortDirection: 'asc',
    currentPage: 1,
    shopsPerPage: 10
  });

  const controller = new ShopsListController(setState);

  useEffect(() => {
    controller.loadShops();
  }, []);

  const filteredShops = useMemo(() => 
    controller.getFilteredAndSortedShops(state), 
    [state.shops, state.searchQuery, state.sortField, state.sortDirection]
  );

  const paginatedShops = useMemo(() => 
    controller.getPaginatedShops(filteredShops, state), 
    [filteredShops, state.currentPage, state.shopsPerPage]
  );

  const totalPages = useMemo(() => 
    controller.getTotalPages(filteredShops, state), 
    [filteredShops, state.shopsPerPage]
  );

  return {
    state,
    controller,
    filteredShops,
    paginatedShops,
    totalPages
  };
};
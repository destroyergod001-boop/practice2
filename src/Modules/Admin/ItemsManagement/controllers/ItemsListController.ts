import { useState, useEffect, useMemo } from 'react';
import { ItemModel, ItemDTOFromApi } from '@core/Model/Item';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { itemsApi } from '@core/api/modelApis';


export type SortField = 'name' | 'tier' | 'item_type';
export type SortDirection = 'asc' | 'desc';

export interface ItemsListState {
  items: ItemModel[];
  loading: boolean;
  searchQuery: string;
  sortField: SortField;
  sortDirection: SortDirection;
  currentPage: number;
  itemsPerPage: number;
}

export class ItemsListController {
  private setState: React.Dispatch<React.SetStateAction<ItemsListState>>;
  protected itemHelper: SimpleModelHelper<ItemDTOFromApi, ItemModel>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<ItemsListState>>) {
    this.setState = setState;
    this.itemHelper = new SimpleModelHelper<ItemDTOFromApi, ItemModel>(itemsApi);
  }
  
  async loadItems() {
    
    try {
      this.setState(prev => ({ ...prev, loading: true }));
      const data = await this.itemHelper.getAll();
      this.setState(prev => ({ ...prev, items: data, loading: false }));
    } catch (error) {
      console.error('Failed to load items:', error);
      this.setState(prev => ({ ...prev, items: [], loading: false }));
    }
  }

  async deleteItem(id: number) {
    try {
      await this.itemHelper.delete(id);
      await this.loadItems();
      return true;
    } catch (error) {
      console.error('Failed to delete item:', error);
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

  setItemsPerPage(itemsPerPage: number) {
    this.setState(prev => ({ ...prev, itemsPerPage, currentPage: 1 }));
  }

  getFilteredAndSortedItems(state: ItemsListState): ItemModel[] {
    let filtered = state.items;

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.item_type.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[state.sortField];
      let bValue: any = b[state.sortField];

      if (state.sortField === 'name' || state.sortField === 'item_type') {
        aValue = (aValue as string).toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return state.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return state.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }

  getPaginatedItems(filteredItems: ItemModel[], state: ItemsListState): ItemModel[] {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  }

  getTotalPages(filteredItems: ItemModel[], state: ItemsListState): number {
    return Math.ceil(filteredItems.length / state.itemsPerPage);
  }
}

export const useItemsListController = () => {
  const [state, setState] = useState<ItemsListState>({
    items: [],
    loading: true,
    searchQuery: '',
    sortField: 'name',
    sortDirection: 'asc',
    currentPage: 1,
    itemsPerPage: 10
  });

  const controller = new ItemsListController(setState);

  useEffect(() => {
    controller.loadItems();
  }, []);

  const filteredItems = useMemo(() => 
    controller.getFilteredAndSortedItems(state), 
    [state.items, state.searchQuery, state.sortField, state.sortDirection]
  );

  const paginatedItems = useMemo(() => 
    controller.getPaginatedItems(filteredItems, state), 
    [filteredItems, state.currentPage, state.itemsPerPage]
  );

  const totalPages = useMemo(() => 
    controller.getTotalPages(filteredItems, state), 
    [filteredItems, state.itemsPerPage]
  );

  return {
    state,
    controller,
    filteredItems,
    paginatedItems,
    totalPages
  };
};
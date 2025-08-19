import { useState, useEffect, useMemo } from 'react';
import { VillienModel, VillienDTOFromApi } from '@core/Model/Villien';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { villiensApi } from '@core/api/modelApis';


export type SortField = 'name' | 'tier' | 'villien_type';
export type SortDirection = 'asc' | 'desc';

export interface VilliensListState {
  villiens: VillienModel[];
  loading: boolean;
  searchQuery: string;
  sortField: SortField;
  sortDirection: SortDirection;
  currentPage: number;
  villiensPerPage: number;
}

export class VilliensListController {
  private setState: React.Dispatch<React.SetStateAction<VilliensListState>>;
  protected villienHelper: SimpleModelHelper<VillienDTOFromApi, VillienModel>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<VilliensListState>>) {
    this.setState = setState;
    this.villienHelper = new SimpleModelHelper<VillienDTOFromApi, VillienModel>(villiensApi);
  }
  
  async loadVilliens() {
    
    try {
      this.setState(prev => ({ ...prev, loading: true }));
      const data = await this.villienHelper.getAll();
      this.setState(prev => ({ ...prev, villiens: data, loading: false }));
    } catch (error) {
      console.error('Failed to load villiens:', error);
      this.setState(prev => ({ ...prev, villiens: [], loading: false }));
    }
  }

  async deleteVillien(id: number) {
    try {
      await this.villienHelper.delete(id);
      await this.loadVilliens();
      return true;
    } catch (error) {
      console.error('Failed to delete villien:', error);
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

  setVilliensPerPage(villiensPerPage: number) {
    this.setState(prev => ({ ...prev, villiensPerPage, currentPage: 1 }));
  }

  getFilteredAndSortedVilliens(state: VilliensListState): VillienModel[] {
    let filtered = state.villiens;

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(villien =>
        villien.name.toLowerCase().includes(query) ||
        villien.description.toLowerCase().includes(query) ||
        villien.villien_type.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[state.sortField];
      let bValue: any = b[state.sortField];

      if (state.sortField === 'name' || state.sortField === 'villien_type') {
        aValue = (aValue as string).toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return state.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return state.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }

  getPaginatedVilliens(filteredVilliens: VillienModel[], state: VilliensListState): VillienModel[] {
    const startIndex = (state.currentPage - 1) * state.villiensPerPage;
    const endIndex = startIndex + state.villiensPerPage;
    return filteredVilliens.slice(startIndex, endIndex);
  }

  getTotalPages(filteredVilliens: VillienModel[], state: VilliensListState): number {
    return Math.ceil(filteredVilliens.length / state.villiensPerPage);
  }
}

export const useVilliensListController = () => {
  const [state, setState] = useState<VilliensListState>({
    villiens: [],
    loading: true,
    searchQuery: '',
    sortField: 'name',
    sortDirection: 'asc',
    currentPage: 1,
    villiensPerPage: 10
  });

  const controller = new VilliensListController(setState);

  useEffect(() => {
    controller.loadVilliens();
  }, []);

  const filteredVilliens = useMemo(() => 
    controller.getFilteredAndSortedVilliens(state), 
    [state.villiens, state.searchQuery, state.sortField, state.sortDirection]
  );

  const paginatedVilliens = useMemo(() => 
    controller.getPaginatedVilliens(filteredVilliens, state), 
    [filteredVilliens, state.currentPage, state.villiensPerPage]
  );

  const totalPages = useMemo(() => 
    controller.getTotalPages(filteredVilliens, state), 
    [filteredVilliens, state.villiensPerPage]
  );

  return {
    state,
    controller,
    filteredVilliens,
    paginatedVilliens,
    totalPages
  };
};
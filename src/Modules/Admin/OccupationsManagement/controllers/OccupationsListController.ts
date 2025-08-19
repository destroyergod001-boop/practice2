import { useState, useEffect, useMemo } from 'react';
import { OccupationModel, OccupationDTOFromApi } from '@core/Model/Occupation';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { occupationsApi } from '@core/api/modelApis';


export type SortField = 'name' | 'tier';
export type SortDirection = 'asc' | 'desc';

export interface OccupationsListState {
  occupations: OccupationModel[];
  loading: boolean;
  searchQuery: string;
  sortField: SortField;
  sortDirection: SortDirection;
  currentPage: number;
  itemsPerPage: number;
}

export class OccupationsListController {
  private setState: React.Dispatch<React.SetStateAction<OccupationsListState>>;
  protected occupationHelper: SimpleModelHelper<OccupationDTOFromApi, OccupationModel>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<OccupationsListState>>) {
    this.setState = setState;
    this.occupationHelper = new SimpleModelHelper<OccupationDTOFromApi, OccupationModel>(occupationsApi);
  }
  
  async loadOccupations() {
    
    try {
      this.setState(prev => ({ ...prev, loading: true }));
      const data = await this.occupationHelper.getAll();
      this.setState(prev => ({ ...prev, occupations: data, loading: false }));
    } catch (error) {
      console.error('Failed to load occupations:', error);
      this.setState(prev => ({ ...prev, occupations: [], loading: false }));
    }
  }

  async deleteOccupation(id: number) {
    try {
      await this.occupationHelper.delete(id);
      await this.loadOccupations();
      return true;
    } catch (error) {
      console.error('Failed to delete occupation:', error);
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

  getFilteredAndSortedOccupations(state: OccupationsListState): OccupationModel[] {
    let filtered = state.occupations;

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(occupation =>
        occupation.name.toLowerCase().includes(query) ||
        occupation.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[state.sortField];
      let bValue: any = b[state.sortField];

      if (state.sortField === 'name') {
        aValue = (aValue as string).toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return state.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return state.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }

  getPaginatedOccupations(filteredOccupations: OccupationModel[], state: OccupationsListState): OccupationModel[] {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    return filteredOccupations.slice(startIndex, endIndex);
  }

  getTotalPages(filteredOccupations: OccupationModel[], state: OccupationsListState): number {
    return Math.ceil(filteredOccupations.length / state.itemsPerPage);
  }
}

export const useOccupationsListController = () => {
  const [state, setState] = useState<OccupationsListState>({
    occupations: [],
    loading: true,
    searchQuery: '',
    sortField: 'name',
    sortDirection: 'asc',
    currentPage: 1,
    itemsPerPage: 10
  });

  const controller = new OccupationsListController(setState);

  useEffect(() => {
    controller.loadOccupations();
  }, []);

  const filteredOccupations = useMemo(() => 
    controller.getFilteredAndSortedOccupations(state), 
    [state.occupations, state.searchQuery, state.sortField, state.sortDirection]
  );

  const paginatedOccupations = useMemo(() => 
    controller.getPaginatedOccupations(filteredOccupations, state), 
    [filteredOccupations, state.currentPage, state.itemsPerPage]
  );

  const totalPages = useMemo(() => 
    controller.getTotalPages(filteredOccupations, state), 
    [filteredOccupations, state.itemsPerPage]
  );

  return {
    state,
    controller,
    filteredOccupations,
    paginatedOccupations,
    totalPages
  };
};
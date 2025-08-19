import { useState, useEffect, useMemo } from 'react';
import { RaceModel, RaceDTOFromApi } from '@core/Model/Race';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { racesApi } from '@core/api/modelApis';


export type SortField = 'name' | 'category' | 'tier' | 'level';
export type SortDirection = 'asc' | 'desc';

export interface RacesListState {
  races: RaceModel[];
  loading: boolean;
  searchQuery: string;
  sortField: SortField;
  sortDirection: SortDirection;
  currentPage: number;
  itemsPerPage: number;
}

export class RacesListController {
  private setState: React.Dispatch<React.SetStateAction<RacesListState>>;
  protected raceHelper: SimpleModelHelper<RaceDTOFromApi, RaceModel>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<RacesListState>>) {
    this.setState = setState;
    this.raceHelper = new SimpleModelHelper<RaceDTOFromApi, RaceModel>(racesApi);
  }
  
  async loadRaces() {
    
    try {
      this.setState(prev => ({ ...prev, loading: true }));
      const data = await this.raceHelper.getAll();
      this.setState(prev => ({ ...prev, races: data, loading: false }));
    } catch (error) {
      console.error('Failed to load races:', error);
      this.setState(prev => ({ ...prev, races: [], loading: false }));
    }
  }

  async deleteRace(id: number) {
    try {
      await this.raceHelper.delete(id);
      await this.loadRaces();
      return true;
    } catch (error) {
      console.error('Failed to delete race:', error);
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

  getFilteredAndSortedRaces(state: RacesListState): RaceModel[] {
    let filtered = state.races;

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(race =>
        race.name.toLowerCase().includes(query) ||
        race.description.toLowerCase().includes(query) ||
        race.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[state.sortField];
      let bValue: any = b[state.sortField];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return state.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return state.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }

  getPaginatedRaces(filteredRaces: RaceModel[], state: RacesListState): RaceModel[] {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    return filteredRaces.slice(startIndex, endIndex);
  }

  getTotalPages(filteredRaces: RaceModel[], state: RacesListState): number {
    return Math.ceil(filteredRaces.length / state.itemsPerPage);
  }
}

export const useRacesListController = () => {
  const [state, setState] = useState<RacesListState>({
    races: [],
    loading: true,
    searchQuery: '',
    sortField: 'name',
    sortDirection: 'asc',
    currentPage: 1,
    itemsPerPage: 10
  });

  const controller = new RacesListController(setState);

  useEffect(() => {
    controller.loadRaces();
  }, []);

  const filteredRaces = useMemo(() => 
    controller.getFilteredAndSortedRaces(state), 
    [state.races, state.searchQuery, state.sortField, state.sortDirection]
  );

  const paginatedRaces = useMemo(() => 
    controller.getPaginatedRaces(filteredRaces, state), 
    [filteredRaces, state.currentPage, state.itemsPerPage]
  );

  const totalPages = useMemo(() => 
    controller.getTotalPages(filteredRaces, state), 
    [filteredRaces, state.itemsPerPage]
  );

  return {
    state,
    controller,
    filteredRaces,
    paginatedRaces,
    totalPages
  };
};
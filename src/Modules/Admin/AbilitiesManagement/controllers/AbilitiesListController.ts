import { useState, useEffect, useMemo } from 'react';
import { AbilityModel, AbilityDTOFromApi } from '@core/Model/Ability';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { abilitiesApi } from '@core/api/modelApis';


export type SortField = 'name' | 'category' | 'tier' | 'level';
export type SortDirection = 'asc' | 'desc';

export interface AbilitiesListState {
  abilities: AbilityModel[];
  loading: boolean;
  searchQuery: string;
  sortField: SortField;
  sortDirection: SortDirection;
  currentPage: number;
  itemsPerPage: number;
}

export class AbilitiesListController {
  private setState: React.Dispatch<React.SetStateAction<AbilitiesListState>>;
  protected abilityHelper: SimpleModelHelper<AbilityDTOFromApi, AbilityModel>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<AbilitiesListState>>) {
    this.setState = setState;
    this.abilityHelper = new SimpleModelHelper<AbilityDTOFromApi, AbilityModel>(abilitiesApi);
  }
  
  async loadAbilities() {
    
    try {
      this.setState(prev => ({ ...prev, loading: true }));
      const data = await this.abilityHelper.getAll();
      this.setState(prev => ({ ...prev, abilities: data, loading: false }));
    } catch (error) {
      console.error('Failed to load abilities:', error);
      this.setState(prev => ({ ...prev, abilities: [], loading: false }));
    }
  }

  async deleteAbility(id: number) {
    try {
      await this.abilityHelper.delete(id);
      await this.loadAbilities();
      return true;
    } catch (error) {
      console.error('Failed to delete ability:', error);
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

  getFilteredAndSortedAbilities(state: AbilitiesListState): AbilityModel[] {
    let filtered = state.abilities;

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(ability =>
        ability.name.toLowerCase().includes(query) ||
        ability.description.toLowerCase().includes(query) ||
        ability.category.toLowerCase().includes(query)
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

  getPaginatedAbilities(filteredAbilities: AbilityModel[], state: AbilitiesListState): AbilityModel[] {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    return filteredAbilities.slice(startIndex, endIndex);
  }

  getTotalPages(filteredAbilities: AbilityModel[], state: AbilitiesListState): number {
    return Math.ceil(filteredAbilities.length / state.itemsPerPage);
  }
}

export const useAbilitiesListController = () => {
  const [state, setState] = useState<AbilitiesListState>({
    abilities: [],
    loading: true,
    searchQuery: '',
    sortField: 'name',
    sortDirection: 'asc',
    currentPage: 1,
    itemsPerPage: 10
  });

  const controller = new AbilitiesListController(setState);

  useEffect(() => {
    controller.loadAbilities();
  }, []);

  const filteredAbilities = useMemo(() => 
    controller.getFilteredAndSortedAbilities(state), 
    [state.abilities, state.searchQuery, state.sortField, state.sortDirection]
  );

  const paginatedAbilities = useMemo(() => 
    controller.getPaginatedAbilities(filteredAbilities, state), 
    [filteredAbilities, state.currentPage, state.itemsPerPage]
  );

  const totalPages = useMemo(() => 
    controller.getTotalPages(filteredAbilities, state), 
    [filteredAbilities, state.itemsPerPage]
  );

  return {
    state,
    controller,
    filteredAbilities,
    paginatedAbilities,
    totalPages
  };
};
import { useState, useEffect, useMemo } from 'react';
import { MonsterModel, MonsterDTOFromApi } from '@core/Model/Monster';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { monstersApi } from '@core/api/modelApis';


export type SortField = 'name' | 'tier' | 'monster_type';
export type SortDirection = 'asc' | 'desc';

export interface MonstersListState {
  monsters: MonsterModel[];
  loading: boolean;
  searchQuery: string;
  sortField: SortField;
  sortDirection: SortDirection;
  currentPage: number;
  monstersPerPage: number;
}

export class MonstersListController {
  private setState: React.Dispatch<React.SetStateAction<MonstersListState>>;
  protected monsterHelper: SimpleModelHelper<MonsterDTOFromApi, MonsterModel>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<MonstersListState>>) {
    this.setState = setState;
    this.monsterHelper = new SimpleModelHelper<MonsterDTOFromApi, MonsterModel>(monstersApi);
  }
  
  async loadMonsters() {
    
    try {
      this.setState(prev => ({ ...prev, loading: true }));
      const data = await this.monsterHelper.getAll();
      this.setState(prev => ({ ...prev, monsters: data, loading: false }));
    } catch (error) {
      console.error('Failed to load monsters:', error);
      this.setState(prev => ({ ...prev, monsters: [], loading: false }));
    }
  }

  async deleteMonster(id: number) {
    try {
      await this.monsterHelper.delete(id);
      await this.loadMonsters();
      return true;
    } catch (error) {
      console.error('Failed to delete monster:', error);
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

  setMonstersPerPage(monstersPerPage: number) {
    this.setState(prev => ({ ...prev, monstersPerPage, currentPage: 1 }));
  }

  getFilteredAndSortedMonsters(state: MonstersListState): MonsterModel[] {
    let filtered = state.monsters;

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(monster =>
        monster.name.toLowerCase().includes(query) ||
        monster.description.toLowerCase().includes(query) ||
        monster.monster_type.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[state.sortField];
      let bValue: any = b[state.sortField];

      if (state.sortField === 'name' || state.sortField === 'monster_type') {
        aValue = (aValue as string).toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return state.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return state.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }

  getPaginatedMonsters(filteredMonsters: MonsterModel[], state: MonstersListState): MonsterModel[] {
    const startIndex = (state.currentPage - 1) * state.monstersPerPage;
    const endIndex = startIndex + state.monstersPerPage;
    return filteredMonsters.slice(startIndex, endIndex);
  }

  getTotalPages(filteredMonsters: MonsterModel[], state: MonstersListState): number {
    return Math.ceil(filteredMonsters.length / state.monstersPerPage);
  }
}

export const useMonstersListController = () => {
  const [state, setState] = useState<MonstersListState>({
    monsters: [],
    loading: true,
    searchQuery: '',
    sortField: 'name',
    sortDirection: 'asc',
    currentPage: 1,
    monstersPerPage: 10
  });

  const controller = new MonstersListController(setState);

  useEffect(() => {
    controller.loadMonsters();
  }, []);

  const filteredMonsters = useMemo(() => 
    controller.getFilteredAndSortedMonsters(state), 
    [state.monsters, state.searchQuery, state.sortField, state.sortDirection]
  );

  const paginatedMonsters = useMemo(() => 
    controller.getPaginatedMonsters(filteredMonsters, state), 
    [filteredMonsters, state.currentPage, state.monstersPerPage]
  );

  const totalPages = useMemo(() => 
    controller.getTotalPages(filteredMonsters, state), 
    [filteredMonsters, state.monstersPerPage]
  );

  return {
    state,
    controller,
    filteredMonsters,
    paginatedMonsters,
    totalPages
  };
};
import { useState, useEffect, useMemo } from 'react';
import { SkillModel, SkillDTOFromApi } from '@core/Model/Skill';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { skillsApi } from '@core/api/modelApis';


export type SortField = 'name' | 'category' | 'tier' | 'level';
export type SortDirection = 'asc' | 'desc';

export interface SkillsListState {
  skills: SkillModel[];
  loading: boolean;
  searchQuery: string;
  sortField: SortField;
  sortDirection: SortDirection;
  currentPage: number;
  itemsPerPage: number;
}

export class SkillsListController {
  private setState: React.Dispatch<React.SetStateAction<SkillsListState>>;
  protected skillHelper: SimpleModelHelper<SkillDTOFromApi, SkillModel>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<SkillsListState>>) {
    this.setState = setState;
    this.skillHelper = new SimpleModelHelper<SkillDTOFromApi, SkillModel>(skillsApi);
  }
  
  async loadSkills() {
    
    try {
      this.setState(prev => ({ ...prev, loading: true }));
      const data = await this.skillHelper.getAll();
      this.setState(prev => ({ ...prev, skills: data, loading: false }));
    } catch (error) {
      console.error('Failed to load skills:', error);
      this.setState(prev => ({ ...prev, skills: [], loading: false }));
    }
  }

  async deleteSkill(id: number) {
    try {
      await this.skillHelper.delete(id);
      await this.loadSkills();
      return true;
    } catch (error) {
      console.error('Failed to delete skill:', error);
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

  getFilteredAndSortedSkills(state: SkillsListState): SkillModel[] {
    let filtered = state.skills;

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(skill =>
        skill.name.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query)
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

  getPaginatedSkills(filteredSkills: SkillModel[], state: SkillsListState): SkillModel[] {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    return filteredSkills.slice(startIndex, endIndex);
  }

  getTotalPages(filteredSkills: SkillModel[], state: SkillsListState): number {
    return Math.ceil(filteredSkills.length / state.itemsPerPage);
  }
}

export const useSkillsListController = () => {
  const [state, setState] = useState<SkillsListState>({
    skills: [],
    loading: true,
    searchQuery: '',
    sortField: 'name',
    sortDirection: 'asc',
    currentPage: 1,
    itemsPerPage: 10
  });

  const controller = new SkillsListController(setState);

  useEffect(() => {
    controller.loadSkills();
  }, []);

  const filteredSkills = useMemo(() => 
    controller.getFilteredAndSortedSkills(state), 
    [state.skills, state.searchQuery, state.sortField, state.sortDirection]
  );

  const paginatedSkills = useMemo(() => 
    controller.getPaginatedSkills(filteredSkills, state), 
    [filteredSkills, state.currentPage, state.itemsPerPage]
  );

  const totalPages = useMemo(() => 
    controller.getTotalPages(filteredSkills, state), 
    [filteredSkills, state.itemsPerPage]
  );

  return {
    state,
    controller,
    filteredSkills,
    paginatedSkills,
    totalPages
  };
};
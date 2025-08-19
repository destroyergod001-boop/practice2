import { useState } from 'react';
import { MonsterModel, getDefaultMonsterData, MonsterDTOFromApi } from '@core/Model/Monster';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { monstersApi } from '@core/api/modelApis';

export type MonsterModalTab = 'basic' | 'stats' | 'requirements' | 'elements' | 'asset';

export interface MonsterModalState {
  activeTab: MonsterModalTab;
  monsterData: Partial<MonsterModel>;
  loading: boolean;
  errors: Record<string, string>;
}

export class MonsterModalController {
  private setState: React.Dispatch<React.SetStateAction<MonsterModalState>>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<MonsterModalState>>) {
    this.setState = setState;
  }

  setActiveTab(tab: MonsterModalTab) {
    this.setState(prev => ({ ...prev, activeTab: tab }));
  }

  updateMonsterData(data: Partial<MonsterModel>) {
    this.setState(prev => ({ ...prev, monsterData: { ...prev.monsterData, ...data } }));
  }

  setMonsterData(data: Partial<MonsterModel>) {
    this.setState(prev => ({ ...prev, monsterData: data }));
  }

  initializeMonster(monster?: MonsterModel | null) {
    if (monster) {
      this.setMonsterData(monster);
    } else {
      this.setMonsterData(getDefaultMonsterData());
    }
    this.setState(prev => ({ ...prev, activeTab: 'basic', errors: {} }));
  }

  validateMonster(data: Partial<MonsterModel>): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!data.name?.trim()) {
      errors.name = 'Name is required';
    }

    
    if (data.tier && (data.tier < 1 || data.tier > 10)) {
      errors.tier = 'Tier must be between 1 and 10';
    }

    return errors;
  }

  clearGeneralError() {
    this.setState(prev => ({ ...prev, errors: { ...prev.errors, general: '' } }));
  }

  async saveMonster(monster?: MonsterModel | null): Promise<boolean> {
    try {
      this.setState(prev => ({ ...prev, loading: true, errors: {} }));
      
      const errors = this.validateMonster(this.getMonsterData());
      if (Object.keys(errors).length > 0) {
        this.setState(prev => ({ ...prev, errors, loading: false }));
        return false;
      }

      const monsterHelper = new SimpleModelHelper<MonsterDTOFromApi, MonsterModel>(monstersApi);

      if (monster?.id) {
        await monsterHelper.update(monster.id, this.getMonsterData());
      } else {
        await monsterHelper.create(this.getMonsterData());
      }
      
      this.setState(prev => ({ ...prev, loading: false }));
      return true;
    } catch (error) {
      console.error('Failed to save monster:', error);
      this.setState(prev => ({ 
        ...prev, 
        loading: false, 
        errors: { general: 'Failed to save monster. Please try again.' }
      }));
      return false;
    }
  }

  getMonsterData(): Partial<MonsterModel> {
    return {};
  }
}

export const useMonsterModalController = () => {
  const [state, setState] = useState<MonsterModalState>(() => ({
    activeTab: 'basic',
    monsterData: getDefaultMonsterData(),
    loading: false,
    errors: {}
  }));

  const controller = new MonsterModalController(setState);
  
  // Override the getMonsterData method to return current state data
  controller.getMonsterData = () => state.monsterData;

  return {
    state,
    controller
  };
};
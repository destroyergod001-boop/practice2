import { useState } from 'react';
import { AbilityModel, getDefaultAbilityData, AbilityDTOFromApi } from '@core/Model/Ability';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { abilitiesApi } from '@core/api/modelApis';

export type AbilityModalTab = 'basic' | 'stats' | 'requirements' | 'elements' | 'asset';

export interface AbilityModalState {
  activeTab: AbilityModalTab;
  abilityData: Partial<AbilityModel>;
  loading: boolean;
  errors: Record<string, string>;
}

export class AbilityModalController {
  private setState: React.Dispatch<React.SetStateAction<AbilityModalState>>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<AbilityModalState>>) {
    this.setState = setState;
  }

  setActiveTab(tab: AbilityModalTab) {
    this.setState(prev => ({ ...prev, activeTab: tab }));
  }

  updateAbilityData(data: Partial<AbilityModel>) {
    this.setState(prev => ({ ...prev, abilityData: { ...prev.abilityData, ...data } }));
  }

  setAbilityData(data: Partial<AbilityModel>) {
    this.setState(prev => ({ ...prev, abilityData: data }));
  }

  initializeAbility(ability?: AbilityModel | null) {
    if (ability) {
      this.setAbilityData(ability);
    } else {
      this.setAbilityData(getDefaultAbilityData());
    }
    this.setState(prev => ({ ...prev, activeTab: 'basic', errors: {} }));
  }

  validateAbility(data: Partial<AbilityModel>): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!data.name?.trim()) {
      errors.name = 'Name is required';
    }

    if (!data.category) {
      errors.category = 'Category is required';
    }

    if (data.tier && (data.tier < 1 || data.tier > 10)) {
      errors.tier = 'Tier must be between 1 and 10';
    }

    return errors;
  }

  clearGeneralError() {
    this.setState(prev => ({ ...prev, errors: { ...prev.errors, general: '' } }));
  }

  async saveAbility(ability?: AbilityModel | null): Promise<boolean> {
    try {
      this.setState(prev => ({ ...prev, loading: true, errors: {} }));
      
      const errors = this.validateAbility(this.getAbilityData());
      if (Object.keys(errors).length > 0) {
        this.setState(prev => ({ ...prev, errors, loading: false }));
        return false;
      }

      const abilityHelper = new SimpleModelHelper<AbilityDTOFromApi, AbilityModel>(abilitiesApi);

      if (ability?.id) {
        await abilityHelper.update(ability.id, this.getAbilityData());
      } else {
        await abilityHelper.create(this.getAbilityData());
      }
      
      this.setState(prev => ({ ...prev, loading: false }));
      return true;
    } catch (error) {
      console.error('Failed to save ability:', error);
      this.setState(prev => ({ 
        ...prev, 
        loading: false, 
        errors: { general: 'Failed to save ability. Please try again.' }
      }));
      return false;
    }
  }

  getAbilityData(): Partial<AbilityModel> {
    return {};
  }
}

export const useAbilityModalController = () => {
  const [state, setState] = useState<AbilityModalState>(() => ({
    activeTab: 'basic',
    abilityData: getDefaultAbilityData(),
    loading: false,
    errors: {}
  }));

  const controller = new AbilityModalController(setState);
  
  // Override the getAbilityData method to return current state data
  controller.getAbilityData = () => state.abilityData;

  return {
    state,
    controller
  };
};
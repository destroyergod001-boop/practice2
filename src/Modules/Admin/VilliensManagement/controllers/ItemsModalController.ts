import { useState } from 'react';
import { VillienModel, getDefaultVillienData, VillienDTOFromApi } from '@core/Model/Villien';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { villiensApi } from '@core/api/modelApis';

export type VillienModalTab = 'basic' | 'stats' | 'requirements' | 'elements' | 'asset';

export interface VillienModalState {
  activeTab: VillienModalTab;
  villienData: Partial<VillienModel>;
  loading: boolean;
  errors: Record<string, string>;
}

export class VillienModalController {
  private setState: React.Dispatch<React.SetStateAction<VillienModalState>>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<VillienModalState>>) {
    this.setState = setState;
  }

  setActiveTab(tab: VillienModalTab) {
    this.setState(prev => ({ ...prev, activeTab: tab }));
  }

  updateVillienData(data: Partial<VillienModel>) {
    this.setState(prev => ({ ...prev, villienData: { ...prev.villienData, ...data } }));
  }

  setVillienData(data: Partial<VillienModel>) {
    this.setState(prev => ({ ...prev, villienData: data }));
  }

  initializeVillien(villien?: VillienModel | null) {
    if (villien) {
      this.setVillienData(villien);
    } else {
      this.setVillienData(getDefaultVillienData());
    }
    this.setState(prev => ({ ...prev, activeTab: 'basic', errors: {} }));
  }

  validateVillien(data: Partial<VillienModel>): Record<string, string> {
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

  async saveVillien(villien?: VillienModel | null): Promise<boolean> {
    try {
      this.setState(prev => ({ ...prev, loading: true, errors: {} }));
      
      const errors = this.validateVillien(this.getVillienData());
      if (Object.keys(errors).length > 0) {
        this.setState(prev => ({ ...prev, errors, loading: false }));
        return false;
      }

      const villienHelper = new SimpleModelHelper<VillienDTOFromApi, VillienModel>(villiensApi);

      if (villien?.id) {
        await villienHelper.update(villien.id, this.getVillienData());
      } else {
        await villienHelper.create(this.getVillienData());
      }
      
      this.setState(prev => ({ ...prev, loading: false }));
      return true;
    } catch (error) {
      console.error('Failed to save villien:', error);
      this.setState(prev => ({ 
        ...prev, 
        loading: false, 
        errors: { general: 'Failed to save villien. Please try again.' }
      }));
      return false;
    }
  }

  getVillienData(): Partial<VillienModel> {
    return {};
  }
}

export const useVillienModalController = () => {
  const [state, setState] = useState<VillienModalState>(() => ({
    activeTab: 'basic',
    villienData: getDefaultVillienData(),
    loading: false,
    errors: {}
  }));

  const controller = new VillienModalController(setState);
  
  // Override the getVillienData method to return current state data
  controller.getVillienData = () => state.villienData;

  return {
    state,
    controller
  };
};
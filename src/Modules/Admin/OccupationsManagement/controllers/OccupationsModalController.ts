import { useState } from 'react';
import { OccupationModel, getDefaultOccupationData, OccupationDTOFromApi } from '@core/Model/Occupation';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { occupationsApi } from '@core/api/modelApis';

export type OccupationModalTab = 'basic' | 'stats' | 'requirements' | 'elements' | 'asset';

export interface OccupationModalState {
  activeTab: OccupationModalTab;
  occupationData: Partial<OccupationModel>;
  loading: boolean;
  errors: Record<string, string>;
}

export class OccupationModalController {
  private setState: React.Dispatch<React.SetStateAction<OccupationModalState>>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<OccupationModalState>>) {
    this.setState = setState;
  }

  setActiveTab(tab: OccupationModalTab) {
    this.setState(prev => ({ ...prev, activeTab: tab }));
  }

  updateOccupationData(data: Partial<OccupationModel>) {
    this.setState(prev => ({ ...prev, occupationData: { ...prev.occupationData, ...data } }));
  }

  setOccupationData(data: Partial<OccupationModel>) {
    this.setState(prev => ({ ...prev, occupationData: data }));
  }

  initializeOccupation(occupation?: OccupationModel | null) {
    if (occupation) {
      this.setOccupationData(occupation);
    } else {
      this.setOccupationData(getDefaultOccupationData());
    }
    this.setState(prev => ({ ...prev, activeTab: 'basic', errors: {} }));
  }

  validateOccupation(data: Partial<OccupationModel>): Record<string, string> {
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

  async saveOccupation(occupation?: OccupationModel | null): Promise<boolean> {
    try {
      this.setState(prev => ({ ...prev, loading: true, errors: {} }));
      
      const errors = this.validateOccupation(this.getOccupationData());
      if (Object.keys(errors).length > 0) {
        this.setState(prev => ({ ...prev, errors, loading: false }));
        return false;
      }

      const occupationHelper = new SimpleModelHelper<OccupationDTOFromApi, OccupationModel>(occupationsApi);

      if (occupation?.id) {
        await occupationHelper.update(occupation.id, this.getOccupationData());
      } else {
        await occupationHelper.create(this.getOccupationData());
      }
      
      this.setState(prev => ({ ...prev, loading: false }));
      return true;
    } catch (error) {
      console.error('Failed to save occupation:', error);
      this.setState(prev => ({ 
        ...prev, 
        loading: false, 
        errors: { general: 'Failed to save occupation. Please try again.' }
      }));
      return false;
    }
  }

  getOccupationData(): Partial<OccupationModel> {
    return {};
  }
}

export const useOccupationModalController = () => {
  const [state, setState] = useState<OccupationModalState>(() => ({
    activeTab: 'basic',
    occupationData: getDefaultOccupationData(),
    loading: false,
    errors: {}
  }));

  const controller = new OccupationModalController(setState);
  
  // Override the getOccupationData method to return current state data
  controller.getOccupationData = () => state.occupationData;

  return {
    state,
    controller
  };
};
import { useState } from 'react';
import { RaceModel, getDefaultRaceData, RaceDTOFromApi } from '@core/Model/Race';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { racesApi } from '@core/api/modelApis';

export type RaceModalTab = 'basic' | 'stats' | 'requirements' | 'elements' | 'asset';

export interface RaceModalState {
  activeTab: RaceModalTab;
  raceData: Partial<RaceModel>;
  loading: boolean;
  errors: Record<string, string>;
}

export class RaceModalController {
  private setState: React.Dispatch<React.SetStateAction<RaceModalState>>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<RaceModalState>>) {
    this.setState = setState;
  }

  setActiveTab(tab: RaceModalTab) {
    this.setState(prev => ({ ...prev, activeTab: tab }));
  }

  updateRaceData(data: Partial<RaceModel>) {
    this.setState(prev => ({ ...prev, raceData: { ...prev.raceData, ...data } }));
  }

  setRaceData(data: Partial<RaceModel>) {
    this.setState(prev => ({ ...prev, raceData: data }));
  }

  initializeRace(race?: RaceModel | null) {
    if (race) {
      this.setRaceData(race);
    } else {
      this.setRaceData(getDefaultRaceData());
    }
    this.setState(prev => ({ ...prev, activeTab: 'basic', errors: {} }));
  }

  validateRace(data: Partial<RaceModel>): Record<string, string> {
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

  async saveRace(race?: RaceModel | null): Promise<boolean> {
    try {
      this.setState(prev => ({ ...prev, loading: true, errors: {} }));
      
      const errors = this.validateRace(this.getRaceData());
      if (Object.keys(errors).length > 0) {
        this.setState(prev => ({ ...prev, errors, loading: false }));
        return false;
      }

      const raceHelper = new SimpleModelHelper<RaceDTOFromApi, RaceModel>(racesApi);

      if (race?.id) {
        await raceHelper.update(race.id, this.getRaceData());
      } else {
        await raceHelper.create(this.getRaceData());
      }
      
      this.setState(prev => ({ ...prev, loading: false }));
      return true;
    } catch (error) {
      console.error('Failed to save race:', error);
      this.setState(prev => ({ 
        ...prev, 
        loading: false, 
        errors: { general: 'Failed to save race. Please try again.' }
      }));
      return false;
    }
  }

  getRaceData(): Partial<RaceModel> {
    return {};
  }
}

export const useRaceModalController = () => {
  const [state, setState] = useState<RaceModalState>(() => ({
    activeTab: 'basic',
    raceData: getDefaultRaceData(),
    loading: false,
    errors: {}
  }));

  const controller = new RaceModalController(setState);
  
  // Override the getRaceData method to return current state data
  controller.getRaceData = () => state.raceData;

  return {
    state,
    controller
  };
};
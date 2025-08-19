import { useState } from 'react';
import { SkillModel, getDefaultSkillData, SkillDTOFromApi } from '@core/Model/Skill';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { skillsApi } from '@core/api/modelApis';

export type SkillModalTab = 'basic' | 'stats' | 'requirements' | 'elements' | 'asset';

export interface SkillModalState {
  activeTab: SkillModalTab;
  skillData: Partial<SkillModel>;
  loading: boolean;
  errors: Record<string, string>;
}

export class SkillModalController {
  private setState: React.Dispatch<React.SetStateAction<SkillModalState>>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<SkillModalState>>) {
    this.setState = setState;
  }

  setActiveTab(tab: SkillModalTab) {
    this.setState(prev => ({ ...prev, activeTab: tab }));
  }

  updateSkillData(data: Partial<SkillModel>) {
    this.setState(prev => ({ ...prev, skillData: { ...prev.skillData, ...data } }));
  }

  setSkillData(data: Partial<SkillModel>) {
    this.setState(prev => ({ ...prev, skillData: data }));
  }

  initializeSkill(skill?: SkillModel | null) {
    if (skill) {
      this.setSkillData(skill);
    } else {
      this.setSkillData(getDefaultSkillData());
    }
    this.setState(prev => ({ ...prev, activeTab: 'basic', errors: {} }));
  }

  validateSkill(data: Partial<SkillModel>): Record<string, string> {
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

  async saveSkill(skill?: SkillModel | null): Promise<boolean> {
    try {
      this.setState(prev => ({ ...prev, loading: true, errors: {} }));
      
      const errors = this.validateSkill(this.getSkillData());
      if (Object.keys(errors).length > 0) {
        this.setState(prev => ({ ...prev, errors, loading: false }));
        return false;
      }

      const skillHelper = new SimpleModelHelper<SkillDTOFromApi, SkillModel>(skillsApi);

      if (skill?.id) {
        await skillHelper.update(skill.id, this.getSkillData());
      } else {
        await skillHelper.create(this.getSkillData());
      }
      
      this.setState(prev => ({ ...prev, loading: false }));
      return true;
    } catch (error) {
      console.error('Failed to save skill:', error);
      this.setState(prev => ({ 
        ...prev, 
        loading: false, 
        errors: { general: 'Failed to save skill. Please try again.' }
      }));
      return false;
    }
  }

  getSkillData(): Partial<SkillModel> {
    return {};
  }
}

export const useSkillModalController = () => {
  const [state, setState] = useState<SkillModalState>(() => ({
    activeTab: 'basic',
    skillData: getDefaultSkillData(),
    loading: false,
    errors: {}
  }));

  const controller = new SkillModalController(setState);
  
  // Override the getSkillData method to return current state data
  controller.getSkillData = () => state.skillData;

  return {
    state,
    controller
  };
};
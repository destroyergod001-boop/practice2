import { useState } from 'react';
import { ItemModel, getDefaultItemData, ItemDTOFromApi } from '@core/Model/Item';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { itemsApi } from '@core/api/modelApis';

export type ItemModalTab = 'basic' | 'stats' | 'requirements' | 'elements' | 'asset';

export interface ItemModalState {
  activeTab: ItemModalTab;
  itemData: Partial<ItemModel>;
  loading: boolean;
  errors: Record<string, string>;
}

export class ItemModalController {
  private setState: React.Dispatch<React.SetStateAction<ItemModalState>>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<ItemModalState>>) {
    this.setState = setState;
  }

  setActiveTab(tab: ItemModalTab) {
    this.setState(prev => ({ ...prev, activeTab: tab }));
  }

  updateItemData(data: Partial<ItemModel>) {
    this.setState(prev => ({ ...prev, itemData: { ...prev.itemData, ...data } }));
  }

  setItemData(data: Partial<ItemModel>) {
    this.setState(prev => ({ ...prev, itemData: data }));
  }

  initializeItem(item?: ItemModel | null) {
    if (item) {
      this.setItemData(item);
    } else {
      this.setItemData(getDefaultItemData());
    }
    this.setState(prev => ({ ...prev, activeTab: 'basic', errors: {} }));
  }

  validateItem(data: Partial<ItemModel>): Record<string, string> {
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

  async saveItem(item?: ItemModel | null): Promise<boolean> {
    try {
      this.setState(prev => ({ ...prev, loading: true, errors: {} }));
      
      const errors = this.validateItem(this.getItemData());
      if (Object.keys(errors).length > 0) {
        this.setState(prev => ({ ...prev, errors, loading: false }));
        return false;
      }

      const itemHelper = new SimpleModelHelper<ItemDTOFromApi, ItemModel>(itemsApi);

      if (item?.id) {
        await itemHelper.update(item.id, this.getItemData());
      } else {
        await itemHelper.create(this.getItemData());
      }
      
      this.setState(prev => ({ ...prev, loading: false }));
      return true;
    } catch (error) {
      console.error('Failed to save item:', error);
      this.setState(prev => ({ 
        ...prev, 
        loading: false, 
        errors: { general: 'Failed to save item. Please try again.' }
      }));
      return false;
    }
  }

  getItemData(): Partial<ItemModel> {
    return {};
  }
}

export const useItemModalController = () => {
  const [state, setState] = useState<ItemModalState>(() => ({
    activeTab: 'basic',
    itemData: getDefaultItemData(),
    loading: false,
    errors: {}
  }));

  const controller = new ItemModalController(setState);
  
  // Override the getItemData method to return current state data
  controller.getItemData = () => state.itemData;

  return {
    state,
    controller
  };
};
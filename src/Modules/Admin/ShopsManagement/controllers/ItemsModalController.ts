import { useState } from 'react';
import { ShopModel, getDefaultShopData, ShopDTOFromApi } from '@core/Model/Shop';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { shopsApi } from '@core/api/modelApis';

export type ShopModalTab = 'basic' | 'stats' | 'requirements' | 'elements' | 'asset';

export interface ShopModalState {
  activeTab: ShopModalTab;
  shopData: Partial<ShopModel>;
  loading: boolean;
  errors: Record<string, string>;
}

export class ShopModalController {
  private setState: React.Dispatch<React.SetStateAction<ShopModalState>>;
  
  constructor(setState: React.Dispatch<React.SetStateAction<ShopModalState>>) {
    this.setState = setState;
  }

  setActiveTab(tab: ShopModalTab) {
    this.setState(prev => ({ ...prev, activeTab: tab }));
  }

  updateShopData(data: Partial<ShopModel>) {
    this.setState(prev => ({ ...prev, shopData: { ...prev.shopData, ...data } }));
  }

  setShopData(data: Partial<ShopModel>) {
    this.setState(prev => ({ ...prev, shopData: data }));
  }

  initializeShop(shop?: ShopModel | null) {
    if (shop) {
      this.setShopData(shop);
    } else {
      this.setShopData(getDefaultShopData());
    }
    this.setState(prev => ({ ...prev, activeTab: 'basic', errors: {} }));
  }

  validateShop(data: Partial<ShopModel>): Record<string, string> {
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

  async saveShop(shop?: ShopModel | null): Promise<boolean> {
    try {
      this.setState(prev => ({ ...prev, loading: true, errors: {} }));
      
      const errors = this.validateShop(this.getShopData());
      if (Object.keys(errors).length > 0) {
        this.setState(prev => ({ ...prev, errors, loading: false }));
        return false;
      }

      const shopHelper = new SimpleModelHelper<ShopDTOFromApi, ShopModel>(shopsApi);

      if (shop?.id) {
        await shopHelper.update(shop.id, this.getShopData());
      } else {
        await shopHelper.create(this.getShopData());
      }
      
      this.setState(prev => ({ ...prev, loading: false }));
      return true;
    } catch (error) {
      console.error('Failed to save shop:', error);
      this.setState(prev => ({ 
        ...prev, 
        loading: false, 
        errors: { general: 'Failed to save shop. Please try again.' }
      }));
      return false;
    }
  }

  getShopData(): Partial<ShopModel> {
    return {};
  }
}

export const useShopModalController = () => {
  const [state, setState] = useState<ShopModalState>(() => ({
    activeTab: 'basic',
    shopData: getDefaultShopData(),
    loading: false,
    errors: {}
  }));

  const controller = new ShopModalController(setState);
  
  // Override the getShopData method to return current state data
  controller.getShopData = () => state.shopData;

  return {
    state,
    controller
  };
};
import React from 'react';
import { ItemModel } from '@core/Model/Item';
import { AssetInput } from '../AdminCommonComponents/AssetInput';


interface ItemAssetTabProps {
  data: Partial<ItemModel>;
  onChange: (data: Partial<ItemModel>) => void;
}

export const ItemAssetTab: React.FC<ItemAssetTabProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof ItemModel, value: any) => {
    onChange({ ...data, [field]: value });
  };



  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Asset Configuration</h4>
        
        <div className="space-y-4">
          <AssetInput
            value={data.asset_location || ''}
            onChange={(value) => handleChange('asset_location', value)}
            label="Asset Location"
            description="Path to the item icon or animation asset"
            acceptedTypes={['image/*']}
            placeholder="e.g., /assets/items/fireball.png"
          />


          
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Asset Guidelines</h5>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Use PNG format for item icons (recommended size: 64x64px)</li>
          <li>• Store assets in the /uploads/items/ directory</li>
          <li>• Use descriptive filenames (e.g., fireball_icon.png)</li>
          <li>• Ensure assets are optimized for web use</li>
        </ul>
      </div>
    </div>
  );
};
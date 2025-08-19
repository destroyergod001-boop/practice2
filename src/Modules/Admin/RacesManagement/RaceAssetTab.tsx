import React from 'react';
import { RaceModel } from '@core/Model/Race';
import { AssetInput } from '../AdminCommonComponents/AssetInput';


interface RaceAssetTabProps {
  data: Partial<RaceModel>;
  onChange: (data: Partial<RaceModel>) => void;
}

export const RaceAssetTab: React.FC<RaceAssetTabProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof RaceModel, value: any) => {
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
            description="Path to the race icon or animation asset"
            acceptedTypes={['image/*']}
            placeholder="e.g., /assets/races/fireball.png"
          />


          
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Asset Guidelines</h5>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Use PNG format for race icons (recommended size: 64x64px)</li>
          <li>• Store assets in the /uploads/races/ directory</li>
          <li>• Use descriptive filenames (e.g., fireball_icon.png)</li>
          <li>• Ensure assets are optimized for web use</li>
        </ul>
      </div>
    </div>
  );
};
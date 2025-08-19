import React from 'react';
import { AbilityModel } from '@core/Model/Ability';
import { AssetInput } from '../AdminCommonComponents/AssetInput';
import { TypeaheadInput } from '@core/ui/TypeaheadInput';
import { TypeaheadOption } from '@core/hooks/useTypeahead';

interface AbilityAssetTabProps {
  data: Partial<AbilityModel>;
  onChange: (data: Partial<AbilityModel>) => void;
}

export const AbilityAssetTab: React.FC<AbilityAssetTabProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof AbilityModel, value: any) => {
    onChange({ ...data, [field]: value });
  };

  // Mock monster options - in real app, this would come from API
  const monsterOptions: TypeaheadOption[] = [
    { id: 0, label: 'None', value: 0 },
    { id: 1, label: 'Fire Dragon', value: 1 },
    { id: 2, label: 'Ice Golem', value: 2 },
    { id: 3, label: 'Shadow Wolf', value: 3 }
  ];

  // Mock item options - in real app, this would come from API
  const itemOptions: TypeaheadOption[] = [
    { id: 0, label: 'None', value: null },
    { id: 1, label: 'Magic Staff', value: 1 },
    { id: 2, label: 'Fire Tome', value: 2 },
    { id: 3, label: 'Crystal Orb', value: 3 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h4 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Asset Configuration</h4>
        
        <div className="space-y-4">
          <AssetInput
            value={data.asset_location || ''}
            onChange={(value) => handleChange('asset_location', value)}
            label="Asset Location"
            description="Path to the ability icon or animation asset"
            acceptedTypes={['image/*']}
            placeholder="e.g., /assets/abilities/fireball.png"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Associated Monster
              </label>
              <TypeaheadInput
                options={monsterOptions}
                onSelect={(option) => handleChange('monster_id', option?.value || 0)}
                placeholder="Select monster..."
                value={monsterOptions.find(m => m.value === data.monster_id)?.label || ''}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Monster that uses this ability (None if not monster-specific)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Monster Number
              </label>
              <input
                type="number"
                value={data.monster_number || 0}
                onChange={(e) => handleChange('monster_number', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                min="0"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Sequence number for monster abilities
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Required Item
            </label>
            <TypeaheadInput
              options={itemOptions}
              onSelect={(option) => handleChange('requirement_item', option?.value)}
              placeholder="Select required item..."
              value={itemOptions.find(i => i.value === data.requirement_item)?.label || ''}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Item required to use this ability (None if no requirement)
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Asset Guidelines</h5>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Use PNG format for ability icons (recommended size: 64x64px)</li>
          <li>• Store assets in the /uploads/abilities/ directory</li>
          <li>• Use descriptive filenames (e.g., fireball_icon.png)</li>
          <li>• Ensure assets are optimized for web use</li>
        </ul>
      </div>
    </div>
  );
};
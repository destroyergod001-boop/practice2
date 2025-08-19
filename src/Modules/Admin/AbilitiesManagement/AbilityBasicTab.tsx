import React from 'react';
import { AbilityModel } from '@core/Model/Ability';
import { AbilityInputController } from './controllers/AbilityInputController';

interface AbilityBasicTabProps {
  data: Partial<AbilityModel>;
  onChange: (data: Partial<AbilityModel>) => void;
  errors?: Record<string, string>;
}

export const AbilityBasicTab: React.FC<AbilityBasicTabProps> = ({ data, onChange, errors = {} }) => {
  const handleChange = (field: keyof AbilityModel, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const categoryOptions = AbilityInputController.getCategoryOptions();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter ability name"
            required
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category *
          </label>
          <select
            value={data.category || 'single'}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-red-600 mt-1">{errors.category}</p>
          )}
        </div>

        {/* Tier */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tier
          </label>
          <input
            type="number"
            value={data.tier || 1}
            onChange={(e) => handleChange('tier', parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="1"
            max="10"
          />
          {errors.tier && (
            <p className="text-xs text-red-600 mt-1">{errors.tier}</p>
          )}
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Level Requirement
          </label>
          <input
            type="number"
            value={data.level || 1}
            onChange={(e) => handleChange('level', parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="1"
          />
        </div>

        {/* Turn Cost */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Turn Cost
          </label>
          <input
            type="number"
            value={data.turn || 1}
            onChange={(e) => handleChange('turn', parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="1"
          />
        </div>

        {/* Gold Cost */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gold Cost
          </label>
          <input
            type="number"
            value={data.gold || 0}
            onChange={(e) => handleChange('gold', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="0"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={data.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Enter ability description"
        />
      </div>

      {/* Effect Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Fixed Effect Value
          </label>
          <input
            type="number"
            value={data.basic_effect_fixed_value || 0}
            onChange={(e) => handleChange('basic_effect_fixed_value', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Percentage Effect Value (%)
          </label>
          <input
            type="number"
            value={data.basic_effect_percentage_value || 0}
            onChange={(e) => handleChange('basic_effect_percentage_value', parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="0"
            max="100"
          />
        </div>
      </div>
    </div>
  );
};
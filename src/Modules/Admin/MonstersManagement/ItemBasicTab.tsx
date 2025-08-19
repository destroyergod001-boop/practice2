import React, { useEffect, useState } from 'react';
import { MonsterModel } from '@core/Model/Monster';
import { TypeaheadInput } from '@core/ui/TypeaheadInput';
import { TypeaheadOption } from '@core/hooks/useTypeahead';
import { abilitiesApi } from '@core/api/modelApis';
import { SimpleModelHelper } from '@core/api/genericModelHelper';
import { AbilityModel, AbilityDTOFromApi } from '@core/Model/Ability';

interface MonsterBasicTabProps {
  data: Partial<MonsterModel>;
  onChange: (data: Partial<MonsterModel>) => void;
  errors?: Record<string, string>;
}

export const MonsterBasicTab: React.FC<MonsterBasicTabProps> = ({ data, onChange, errors = {} }) => {
  const [abilities, setAbilities] = useState<TypeaheadOption[]>([]);
  const abilityHelper = new SimpleModelHelper<AbilityDTOFromApi, AbilityModel>(abilitiesApi);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        const allAbilities = await abilityHelper.getAll();
        const abilityOptions: TypeaheadOption[] = allAbilities.map(ability => ({
          id: ability.id,
          label: ability.name,
          value: ability.id,
        }));
        setAbilities(abilityOptions);
      } catch (error) {
        console.error('Failed to fetch abilities:', error);
      }
    };
    fetchAbilities();
  }, []);

  const handleChange = (field: keyof MonsterModel, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleAbilitySelect = (option: TypeaheadOption | null) => {
    handleChange("basic_ability_id", option ? option.id : null);
  };

  // Find the selected ability name to display in the TypeaheadInput
  const selectedAbilityName = abilities.find(ability => ability.id === data.basic_ability_id)?.label || '';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            value={data.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter monster name"
            required
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
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
            onChange={(e) =>
              handleChange("tier", parseInt(e.target.value) || 1)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            min="1"
            max="10"
          />
          {errors.tier && (
            <p className="text-xs text-red-600 mt-1">{errors.tier}</p>
          )}
        </div>

        {/* Ability Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ability
          </label>
          <TypeaheadInput
            options={abilities}
            onSelect={handleAbilitySelect}
            placeholder="Select an Ability"
            value={selectedAbilityName}
          />
          {errors.basic_ability_id && (
            <p className="text-xs text-red-600 mt-1">{errors.basic_ability_id}</p>
          )}
        </div>

      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={data.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Enter monster description"
        />
      </div>

    </div>
  );
};
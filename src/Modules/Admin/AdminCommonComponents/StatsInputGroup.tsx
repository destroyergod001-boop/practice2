import React, { useState, useEffect } from 'react';
import { statsApi } from '@core/api/modelApis';
import { StatDTOFromApi, StatModel } from '@core/Model/Stats';

interface StatsInputGroupProps {
  data: any;
  onChange: (data: any) => void;
  jsonFieldKey: string;
  title: string;
  description?: string;
}

export const StatsInputGroup: React.FC<StatsInputGroupProps> = ({
  data,
  onChange,
  jsonFieldKey,
  title,
  description
}) => {
  const [stats, setStats] = useState<StatModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const statsData = await statsApi.getAll();
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load stats:', error);
      // Fallback to default stats if API fails
      setStats([
        { id: 1, name: 'Strength', description: 'Physical power', short_name: 'STR' },
        { id: 2, name: 'Intelligence', description: 'Magical Power', short_name: 'INT' },
        { id: 3, name: 'Agility', description: '', short_name: 'AGI' },
        { id: 4, name: 'Constitution', description: '', short_name: 'CON' },
        { id: 5, name: 'Wisdom', description: '', short_name: 'WIS' },
        { id: 6, name: 'Dexterity', description: '', short_name: 'DEX' },
        { id: 7, name: 'Luck', description: '', short_name: 'LUCK' },
        { id: 8, name: 'Charisma', description: '', short_name: 'CHAR' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const currentStats = data[jsonFieldKey] || {};

  const handleStatChange = (shortName: string, value: number) => {
    const updatedStats = { ...currentStats, [shortName]: value };
    onChange({ ...data, [jsonFieldKey]: updatedStats });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-gray-600 dark:text-gray-400">Loading stats...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
      <div className="mb-4">
        <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{title}</h4>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.id} className="flex items-center justify-between bg-white dark:bg-gray-700 p-3 rounded-md">
            <label
              className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1 truncate mr-3"
              title={stat.name}
            >
              {stat.name}
            </label>
            <input
              type="number"
              value={currentStats[stat.short_name] || 0}
              onChange={(e) => handleStatChange(stat.short_name, parseInt(e.target.value) || 0)}
              className="w-20 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white text-right text-sm"
              min="0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
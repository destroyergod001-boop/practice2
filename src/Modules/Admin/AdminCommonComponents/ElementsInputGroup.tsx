import React, { useState, useEffect } from 'react';
import { elementsApi } from '@core/api/modelApis';
import { ElementDTOFromApi, ElementModel } from '@core/Model/Elements';

interface ElementsInputGroupProps {
  data: any;
  onChange: (data: any) => void;
  jsonFieldKey: string;
  title: string;
  description?: string;
}

export const ElementsInputGroup: React.FC<ElementsInputGroupProps> = ({
  data,
  onChange,
  jsonFieldKey,
  title,
  description
}) => {
  const [elements, setElements] = useState<ElementModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadElements();
  }, []);

  const loadElements = async () => {
    try {
      setLoading(true);
      const elementsData = await elementsApi.getAll();
      setElements(elementsData);
    } catch (error) {
      console.error('Failed to load elements:', error);
      // Fallback to default elements if API fails
      setElements([
        { id: 1, name: 'Fire', description: 'fire', weakness_id1: 2, weakness_id2: 0, color: '#a83232' },
        { id: 2, name: 'Water', description: 'water', weakness_id1: 1, weakness_id2: 0, color: '#3c32a8' },
        { id: 3, name: 'Air', description: '', weakness_id1: 0, weakness_id2: 0, color: '' },
        { id: 4, name: 'Earth', description: '', weakness_id1: 0, weakness_id2: 0, color: '' },
        { id: 5, name: 'Wood', description: '', weakness_id1: 0, weakness_id2: 0, color: '' },
        { id: 6, name: 'Metal', description: '', weakness_id1: 0, weakness_id2: 0, color: '' },
        { id: 7, name: 'Light', description: '', weakness_id1: 0, weakness_id2: 0, color: '' },
        { id: 8, name: 'Dark', description: '', weakness_id1: 0, weakness_id2: 0, color: '' },
        { id: 9, name: 'Ice', description: '', weakness_id1: 0, weakness_id2: 0, color: '' },
        { id: 10, name: 'Thunder', description: '', weakness_id1: 0, weakness_id2: 0, color: '' },
        { id: 11, name: 'Life', description: '', weakness_id1: 0, weakness_id2: 0, color: '' },
        { id: 12, name: 'Death', description: '', weakness_id1: 0, weakness_id2: 0, color: '' },
        { id: 13, name: 'Physical', description: '', weakness_id1: 0, weakness_id2: 0, color: '' },
        { id: 14, name: 'Magical', description: '', weakness_id1: 0, weakness_id2: 0, color: '' },
        { id: 15, name: 'Void', description: '', weakness_id1: 0, weakness_id2: 0, color: '' },
        { id: 16, name: 'Chaos', description: '', weakness_id1: 0, weakness_id2: 0, color: '' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const currentElements = data[jsonFieldKey] || {};

  const handleElementChange = (elementName: string, value: number) => {
    const updatedElements = { ...currentElements, [elementName]: value };
    onChange({ ...data, [jsonFieldKey]: updatedElements });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-gray-600 dark:text-gray-400">Loading elements...</div>
      </div>
    );
  }

  return (
  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
      {/* Header */}
      <div className="mb-4">
        <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
          {title}
        </h4>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </p>
        )}
      </div>

      {/* Elements grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {elements.map((element) => {
          const value = currentElements[element.name] || 0;
          return (
            <div
              key={element.id}
              className="bg-white dark:bg-gray-700 p-3 rounded-md"
            >
              {/* Label */}
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 truncate mb-2"
                title={element.name}
              >
                {element.name}
              </label>

              {/* Slider + value */}
              <div className="flex items-center space-x-2 w-full">
               <input
  type="range"
  min="-100"
  max="100"
  value={value}
  onChange={(e) =>
    handleElementChange(element.name, parseInt(e.target.value) || 0)
  }
  className="h-2 rounded-lg appearance-none cursor-pointer"
  style={{
    width: "90%",
    background: `linear-gradient(to right, ${element.color} ${(value + 100) / 2}%, #d1d5db ${(value + 100) / 2}%)`,
  }}
/>

                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-10 text-right">
                  {value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

};
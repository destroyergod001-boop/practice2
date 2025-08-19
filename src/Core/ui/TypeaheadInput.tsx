import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTypeahead, TypeaheadOption } from '../hooks/useTypeahead';

interface TypeaheadInputProps {
  options: TypeaheadOption[];
  onSelect: (option: TypeaheadOption | null) => void;
  placeholder?: string;
  allowCustom?: boolean;
  className?: string;
  value?: string;
}

export const TypeaheadInput: React.FC<TypeaheadInputProps> = ({
  options,
  onSelect,
  placeholder = 'Search...',
  allowCustom = false,
  className = '',
  value = ''
}) => {
  const {
    query,
    isOpen,
    filteredOptions,
    setQuery,
    setIsOpen,
    handleSelect,
    handleBlur
  } = useTypeahead({ options, onSelect, placeholder, allowCustom });

  React.useEffect(() => {
    if (value !== query) {
      setQuery(value);
    }
  }, [value]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${className}`}
        />
        <ChevronDown 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
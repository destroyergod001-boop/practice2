import { useState, useEffect, useMemo } from 'react';

export interface TypeaheadOption {
  id: number | string;
  label: string;
  value: any;
}

export interface UseTypeaheadProps {
  options: TypeaheadOption[];
  onSelect: (option: TypeaheadOption | null) => void;
  placeholder?: string;
  allowCustom?: boolean;
}

export const useTypeahead = ({ options, onSelect, placeholder = '', allowCustom = false }: UseTypeaheadProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TypeaheadOption | null>(null);

  const filteredOptions = useMemo(() => {
    if (!query) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query]);

  const handleSelect = (option: TypeaheadOption) => {
    setSelectedOption(option);
    setQuery(option.label);
    setIsOpen(false);
    onSelect(option);
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(true);
    
    if (!value) {
      setSelectedOption(null);
      onSelect(null);
    } else if (allowCustom) {
      const customOption: TypeaheadOption = {
        id: value,
        label: value,
        value: value
      };
      onSelect(customOption);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 200);
  };

  return {
    query,
    isOpen,
    selectedOption,
    filteredOptions,
    setQuery: handleInputChange,
    setIsOpen,
    handleSelect,
    handleBlur,
    placeholder
  };
};
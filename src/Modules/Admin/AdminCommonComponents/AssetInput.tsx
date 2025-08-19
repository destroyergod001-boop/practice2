import React, { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@core/ui/Button';

interface AssetInputProps {
  value?: string;
  onChange: (value: string) => void;
  label: string;
  description?: string;
  acceptedTypes?: string[];
  placeholder?: string;
}

export const AssetInput: React.FC<AssetInputProps> = ({
  value = '',
  onChange,
  label,
  description,
  acceptedTypes = ['image/*'],
  placeholder = 'Enter asset path or upload file'
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    // In a real implementation, this would upload the file and return the URL
    // For now, we'll just use the file name as a placeholder
    const assetPath = `/uploads/${file.name}`;
    onChange(assetPath);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      )}
      
      <div className="space-y-3">
        {/* Manual Input */}
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {value && (
            <button
              onClick={() => onChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* File Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
            dragOver
              ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
        >
          <div className="space-y-2">
            <Upload className="mx-auto w-8 h-8 text-gray-400" />
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <label className="cursor-pointer text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Click to upload
                <input
                  type="file"
                  className="hidden"
                  accept={acceptedTypes.join(',')}
                  onChange={handleFileInput}
                />
              </label>
              {' '}or drag and drop
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {acceptedTypes.includes('image/*') ? 'PNG, JPG up to 10MB' : 'Files up to 10MB'}
            </p>
          </div>
        </div>
        
        {/* Current File Preview */}
        {value && (
          <div className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
            <File className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">
              {value}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange('')}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
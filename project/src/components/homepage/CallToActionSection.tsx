import React from 'react';

interface CallToActionSectionProps {
  onViewChange: (view: 'menu' | 'admin' | 'play' | 'library') => void;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({ onViewChange }) => {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-bold text-white mb-4">Ready to Begin Your Adventure?</h2>
      <p className="text-gray-300 mb-6">Join the world of interactive storytelling today</p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => onViewChange('library')}
          className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 font-medium"
        >
          Explore Stories
        </button>
        
        <button
          onClick={() => onViewChange('admin')}
          className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium"
        >
          Create Your Own
        </button>
      </div>
    </div>
  );
};
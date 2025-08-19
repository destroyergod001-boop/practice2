import React from 'react';
import { BookOpen, Play, Edit3 } from 'lucide-react';

interface HeroSectionProps {
  onViewChange: (view: 'menu' | 'admin' | 'play' | 'library') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewChange }) => {
  return (
    <div className="text-center space-y-6 py-8">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <BookOpen className="h-16 w-16 text-amber-400" />
        <h1 className="text-5xl font-bold text-white">StoryForge</h1>
      </div>
      
      <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
        Create and play interactive stories with branching narratives. Every choice matters, 
        every path leads to a different adventure.
      </p>

      <div className="flex items-center justify-center space-x-4 pt-6">
        <button
          onClick={() => onViewChange('library')}
          className="flex items-center space-x-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium text-lg"
        >
          <Play className="h-5 w-5" />
          <span>Start Playing</span>
        </button>
        
        <button
          onClick={() => onViewChange('admin')}
          className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg"
        >
          <Edit3 className="h-5 w-5" />
          <span>Create Stories</span>
        </button>
      </div>
    </div>
  );
};
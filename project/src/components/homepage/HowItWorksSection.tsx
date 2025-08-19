import React from 'react';
import { Sparkles, Zap, Users } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700">
      <h2 className="text-3xl font-bold text-white text-center mb-8">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">1. Create or Choose</h3>
          <p className="text-gray-300">Start by creating your own story or selecting one from the library</p>
        </div>
        
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">2. Make Choices</h3>
          <p className="text-gray-300">Navigate through the story by making meaningful choices</p>
        </div>
        
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">3. Experience</h3>
          <p className="text-gray-300">Enjoy unique stories that change based on your decisions</p>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Edit3, Play, Library } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Edit3,
      title: 'Create Stories',
      description: 'Build branching narratives with multiple paths and endings',
      color: 'from-blue-500 to-purple-600',
    },
    {
      icon: Play,
      title: 'Interactive Gameplay',
      description: 'Make choices that shape your adventure and story outcome',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Library,
      title: 'Story Library',
      description: 'Explore a collection of engaging interactive adventures',
      color: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white text-center">Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-gray-600"
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-gray-300 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
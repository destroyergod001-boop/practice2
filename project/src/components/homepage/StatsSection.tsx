import React from 'react';

interface StatsSectionProps {
  storiesCount: number;
  savesCount: number;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ storiesCount, savesCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center border border-gray-700">
        <div className="text-3xl font-bold text-amber-400 mb-2">{storiesCount}</div>
        <div className="text-gray-300">Stories Available</div>
      </div>
      
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center border border-gray-700">
        <div className="text-3xl font-bold text-emerald-400 mb-2">{savesCount}</div>
        <div className="text-gray-300">Game Saves</div>
      </div>
      
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center border border-gray-700">
        <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
        <div className="text-gray-300">Possibilities</div>
      </div>
    </div>
  );
};
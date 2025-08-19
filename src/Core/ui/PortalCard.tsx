import React from 'react';
import { Button } from './Button';

interface PortalCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  variantColor?: 'cyan' | 'purple';
}

export const PortalCard: React.FC<PortalCardProps> = ({
  title,
  description,
  icon,
  onClick,
  variantColor = 'cyan',
}) => {
  const bgGradient =
    variantColor === 'cyan'
      ? 'bg-gradient-to-br from-cyan-500/10 to-cyan-300/10 dark:from-cyan-700/20 dark:to-cyan-600/20'
      : 'bg-gradient-to-br from-purple-500/10 to-pink-400/10 dark:from-purple-700/20 dark:to-pink-600/20';

  return (
    <div
      className={`w-72 rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${bgGradient} backdrop-blur-sm border border-gray-200 dark:border-gray-700`}
      onClick={onClick}
    >
      {/* Row 1: Icon + Title */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/40 dark:bg-black/30 text-gray-900 dark:text-white">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>

      {/* Row 2: Description */}
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug mb-4">
        {description}
      </p>

      {/* Button */}
      <Button
        variant="secondary"
        size="sm"
        className="w-full text-sm font-medium"
      >
        {title.includes('Player') ? 'Enter Game' : 'Admin Access'}
      </Button>
    </div>
  );
};

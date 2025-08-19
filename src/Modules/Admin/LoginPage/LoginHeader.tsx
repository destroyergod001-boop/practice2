import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface LoginHeaderProps {
  onBack: () => void;
  title: string;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({ onBack, title }) => {
  return (
    <div className="flex w-full items-center mb-6">
      <button
        onClick={onBack}
        className="mr-2 flex w-full items-center text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400"
      >
        <ArrowLeft size={20} />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      </button>
      
    </div>
  );
};

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './Button';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={toggleTheme}
        variant="ghost"
        size="sm"
        className="transition-colors duration-300 text-gray-900 dark:text-white hover:bg-gray-200/20 dark:hover:bg-white/10"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </Button>
    </div>
  );
};

import { useTheme } from '../hooks/useTheme';

export const useThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return {
    theme,
    toggle: toggleTheme,
    icon: theme === 'light' ? 'moon' : 'sun', 
  };
};

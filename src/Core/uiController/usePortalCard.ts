import { useCallback } from 'react';
import { Page } from '../../App';

interface UsePortalCardProps {
  onNavigate: (page: Page) => void;
  page: Page;
}

export const usePortalCard = ({ onNavigate, page }: UsePortalCardProps) => {
  const handleClick = useCallback(() => {
    onNavigate(page);
  }, [onNavigate, page]);

  return {
    handleClick,
  };
};

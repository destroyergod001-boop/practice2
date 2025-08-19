import { useState } from 'react';
import { Page } from './App';

export interface User {
  id: string;
  name: string;
  isAdmin: boolean;
}

export const useAppController = () => {
  const [currentPage, setCurrentPage] = useState<Page>('HomePage');
  const [user, setUser] = useState<User | null>(null);
  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('auth-user', JSON.stringify(userData));
    setCurrentPage('HomePage');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('auth-user');
    setCurrentPage('HomePage');
  };
  

 

  const navigate = (page: Page) => setCurrentPage(page);

  return {
    currentPage,
    user,
    handleLogin,
    handleLogout,
    navigate
  };
};

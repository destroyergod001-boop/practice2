// import React from 'react';
import { HomePage } from './Core/HomePage/HomePage'
import { ThemeToggleButton } from './Core/ui/ThemeToggleButton';
import { useAppController } from './AppController';
import { AdminLogin } from './Modules/Admin/LoginPage/AdminLogin';
import { AdminBasePage } from './Modules/Admin/AdminBasePage/AdminBasePage';
import './App.css';
export type Page = 'HomePage' | 'AdminLogin' | 'AdminBasePage' ;

function App() {
  const { currentPage, navigate, handleLogin } = useAppController();
  const renderPage = () => {
    console.log(currentPage);
    switch (currentPage) {
      case 'HomePage':
        return <HomePage onNavigate={navigate} />;
        case 'AdminLogin':
        return <AdminLogin onNavigate={navigate} onLogin={handleLogin}  />;
        case 'AdminBasePage':
        return <AdminBasePage onNavigate={navigate} onLogin={handleLogin}  />;
      default:
        return <HomePage onNavigate={navigate}  />;
    }
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
      <ThemeToggleButton />
      {renderPage()}
    </div>
  );
}

export default App;

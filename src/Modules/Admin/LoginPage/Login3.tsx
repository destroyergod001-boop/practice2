import React, { useState } from 'react';
import { Page } from '../../../App';
import { LoginController, LoginState } from './AdminLoginController';
import { LoginHeader } from './LoginHeader';
import { LoginHint } from './LoginHint';
import { LoginForm } from './LoginForm';

interface Login3Props {
  onNavigate: (page: Page) => void;
  onLogin: (user: any) => void;
}

export const Login3: React.FC<Login3Props> = ({ onNavigate, onLogin }) => {
  const [state, setState] = useState<LoginState>({
    username: '',
    password: '',
    loading: false,
  });

  const controller = new LoginController(setState, onNavigate, onLogin);
  controller.state = state;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">

      <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl p-8 w-full max-w-md border border-white/20 dark:border-gray-700 shadow-2xl">
        <LoginHeader onBack={() => onNavigate('HomePage')} title="Main Portal" />
        <LoginHint />
        <LoginForm state={state} controller={controller} />
      </div>
    </div>
  );
};

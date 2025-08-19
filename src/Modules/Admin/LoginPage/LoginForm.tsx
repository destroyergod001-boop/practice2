
import { LoginController, LoginState } from './AdminLoginController';
import React from 'react';
import { User, Lock } from 'lucide-react';
import { Button } from '../../../Core/ui/Button';

interface LoginFormProps {
  state: LoginState;
  controller: LoginController;
}

export const LoginForm: React.FC<LoginFormProps> = ({ state, controller }) => (
  <form onSubmit={controller.handleSubmit} className="space-y-6">
    <div>
      <label className="block text-white/70 text-sm font-medium mb-2">Username</label>
      <div className="relative">
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/50 w-5 h-5" />
        <input
          type="text"
          value={state.username}
          onChange={(e) => controller.handleChange('username', e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Enter your username"
          required
        />
      </div>
    </div>

    <div>
      <label className="block text-white/70 text-sm font-medium mb-2">Mystical Password</label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black/50 w-5 h-5" />
        <input
          type="password"
          value={state.password}
          onChange={(e) => controller.handleChange('password', e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Speak the magical words"
          required
        />
      </div>
    </div>

    <Button
      type="submit"
      loading={state.loading}
      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3"
      size="lg"
    >
      {state.loading ? 'Casting spell...' : 'Enter the Realm'}
    </Button>
  </form>
);

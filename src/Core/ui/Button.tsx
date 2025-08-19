import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ButtonController, ButtonState } from '../uiController/ButtonController';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  variant?: ButtonState['variant'];
  size?: ButtonState['size'];
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false
}) => {
  const [state, setState] = useState<ButtonState>({
    isLoading: loading,
    isDisabled: disabled,
    variant,
    size
  });

  const controller = new ButtonController(setState);
  const styles = controller.getStyles(state);

  React.useEffect(() => {
    controller.setLoading(loading);
  }, [loading]);

  React.useEffect(() => {
    controller.setDisabled(disabled);
  }, [disabled]);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={state.isDisabled || state.isLoading}
      className={`${styles} ${className}`}
    >
      {state.isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};
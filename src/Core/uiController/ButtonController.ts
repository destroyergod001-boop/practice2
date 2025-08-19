export interface ButtonState {
  isLoading: boolean;
  isDisabled: boolean;
  variant: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size: 'sm' | 'md' | 'lg';
}

import React from 'react';

export class ButtonController {
  constructor(private setState: React.Dispatch<React.SetStateAction<ButtonState>>) {}

  setLoading(loading: boolean) {
    this.setState(prev => ({ ...prev, isLoading: loading }));
  }

  setDisabled(disabled: boolean) {
    this.setState(prev => ({ ...prev, isDisabled: disabled }));
  }

  setVariant(variant: ButtonState['variant']) {
    this.setState(prev => ({ ...prev, variant }));
  }

  setSize(size: ButtonState['size']) {
    this.setState(prev => ({ ...prev, size }));
  }

  getStyles(state: ButtonState): string {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantStyles = {
      primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100',
      danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
      ghost: 'hover:bg-gray-100 text-gray-700 focus:ring-gray-500 dark:hover:bg-gray-800 dark:text-gray-300',
      outline: 'bg-transparent border border-gray-400 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    return `${baseStyles} ${variantStyles[state.variant]} ${sizeStyles[state.size]}`;
  }
}
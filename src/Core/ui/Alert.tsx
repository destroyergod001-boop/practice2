import React from 'react';
import { clsx } from 'clsx';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  title,
  dismissible = false,
  onDismiss,
  className = ''
}) => {
  const variantConfig = {
    info: {
      containerClass: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
      iconClass: 'text-blue-400',
      titleClass: 'text-blue-800 dark:text-blue-200',
      textClass: 'text-blue-700 dark:text-blue-300',
      icon: Info
    },
    success: {
      containerClass: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
      iconClass: 'text-green-400',
      titleClass: 'text-green-800 dark:text-green-200',
      textClass: 'text-green-700 dark:text-green-300',
      icon: CheckCircle
    },
    warning: {
      containerClass: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800',
      iconClass: 'text-yellow-400',
      titleClass: 'text-yellow-800 dark:text-yellow-200',
      textClass: 'text-yellow-700 dark:text-yellow-300',
      icon: AlertCircle
    },
    error: {
      containerClass: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
      iconClass: 'text-red-400',
      titleClass: 'text-red-800 dark:text-red-200',
      textClass: 'text-red-700 dark:text-red-300',
      icon: XCircle
    }
  };

  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className={clsx('border rounded-md p-4', config.containerClass, className)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={clsx('h-5 w-5', config.iconClass)} />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={clsx('text-sm font-medium', config.titleClass)}>
              {title}
            </h3>
          )}
          <div className={clsx('text-sm', title ? 'mt-2' : '', config.textClass)}>
            {children}
          </div>
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onDismiss}
                className={clsx(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  config.iconClass,
                  'hover:bg-black/5 dark:hover:bg-white/5'
                )}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
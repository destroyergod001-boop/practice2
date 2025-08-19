import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ModalController, ModalState } from '../uiController/ModalController';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalState['size'];
  closable?: boolean;
  children: React.ReactNode;
  className?: string; // Added back the className prop
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = '',
  size = '4xl',
  closable = true,
  children,
  className = '' // Destructure className and provide a default empty string
}) => {
  const [state, setState] = useState<ModalState>({
    isOpen,
    title,
    size,
    closable
  });

  const controller = new ModalController(setState);

  useEffect(() => {
    setState(prev => ({ ...prev, isOpen }));
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state.closable) onClose();
    };

    if (state.isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [state.isOpen, state.closable, onClose]);

  if (!state.isOpen) return null;

  return (
    <div className={controller.getOverlayStyles()} onClick={state.closable ? onClose : undefined}>
      <div className={controller.getModalStyles(state) + ` ${className}`} onClick={e => e.stopPropagation()}>
        {(title || closable) && (
          <div className="flex height-10 items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold">{title}</h2>
            {closable && (
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X size={24} />
              </button>
            )}
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
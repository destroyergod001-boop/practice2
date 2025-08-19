export interface ModalState {
  isOpen: boolean;
  title: string;
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  closable: boolean;
}

export class ModalController {
  constructor(private setState: React.Dispatch<React.SetStateAction<ModalState>>) {}

  open(title?: string) {
    this.setState(prev => ({
      ...prev,
      isOpen: true,
      title: title || prev.title
    }));
  }

  close() {
    this.setState(prev => ({ ...prev, isOpen: false }));
  }

  setTitle(title: string) {
    this.setState(prev => ({ ...prev, title }));
  }

  setSize(size: ModalState['size']) {
    this.setState(prev => ({ ...prev, size }));
  }

  setClosable(closable: boolean) {
    this.setState(prev => ({ ...prev, closable }));
  }

  getOverlayStyles(): string {
    return 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
  }

  getModalStyles(state: ModalState): string {
    const baseStyles = 'bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[85vh]';
    
    const sizeStyles = {
      sm: 'max-w-md w-full',
      md: 'max-w-lg w-full',
      lg: 'max-w-2xl w-full',
      xl: 'max-w-4xl w-full',
      '2xl': 'max-w-5xl w-full',
      '3xl': 'max-w-6xl w-full',
      '4xl': 'max-w-7xl w-full',
      '5xl': 'max-w-[90vw] w-full', // Custom very wide size
      '6xl': 'max-w-[95vw] w-full', // Even wider
      '7xl': 'max-w-[98vw] w-full'  // Almost full viewport width
    };
  
    return `${baseStyles} ${sizeStyles[state.size]}`;
  }
}
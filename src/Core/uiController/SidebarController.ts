export interface SidebarState {
  isCollapsed: boolean;
  activeItem: string;
  items: SidebarItem[];
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href?: string;
  onClick?: () => void;
  badge?: string;
}

export type SetSidebarState = (
  state: Partial<SidebarState> | ((prevState: SidebarState) => Partial<SidebarState>)
) => void;

export class SidebarController {
  constructor(private setState: SetSidebarState) {}

  toggle() {
    this.setState(prev => ({ isCollapsed: !prev.isCollapsed }));
  }

  collapse() {
    this.setState({ isCollapsed: true });
  }

  expand() {
    this.setState({ isCollapsed: false });
  }

  setActiveItem(itemId: string) {
    this.setState({ activeItem: itemId });
  }

  setItems(items: SidebarItem[]) {
    this.setState({ items });
  }

  getSidebarStyles(state: SidebarState): string {
    const baseStyles = 'flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300';
    return `${baseStyles} ${state.isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`;
  }

  getItemStyles(isActive: boolean): string {
    const baseStyles = 'flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer';

    const activeStyles = isActive ? `bg-primary-50 dark:bg-primary-900/20 border-r-2 border-primary-600` : '';
    return `${baseStyles} ${activeStyles}`;
  }
}
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SidebarController, SidebarState, SidebarItem } from '../uiController/SidebarController';

interface SidebarProps {
  items: SidebarItem[];
  activeItem?: string;
  onItemClick?: (item: SidebarItem) => void;
  collapsed?: boolean; // Re-added this prop
  onToggle?: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeItem = '',
  onItemClick,
  collapsed = false, // Default to false if not provided
  onToggle
}) => {
  const [state, setState] = useState<SidebarState>({
    isCollapsed: collapsed, // Initialize with collapsed prop
    activeItem,
    items
  });

  React.useEffect(() => {
    setState(prev => ({ ...prev, isCollapsed: collapsed }));
  }, [collapsed]);

  const controller = new SidebarController((newState) => {
    setState(prev => ({ ...prev, ...newState }));
    if (typeof newState === 'object' && newState.isCollapsed !== undefined && onToggle) {
      onToggle(newState.isCollapsed);
    }
  });

  React.useEffect(() => {
    if (activeItem) {
      controller.setActiveItem(activeItem);
    }
  }, [activeItem]);

  React.useEffect(() => {
    controller.collapse(); // Collapse sidebar on initial render
  }, []);

  const handleItemClick = (item: SidebarItem) => {
    controller.setActiveItem(item.id);
    if (onItemClick) {
      onItemClick(item);
    }
    if (item.href) {
      // handle navigation, e.g., using react-router-dom's useNavigate
      // For now, we'll just log it or you can implement actual routing here
      console.log("Navigate to:", item.href);
    }
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div className={controller.getSidebarStyles(state)}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!state.isCollapsed && <h2 className="text-lg font-semibold">Menu</h2>}
        <button
          onClick={() => controller.toggle()}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          {state.isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 p-2 space-y-1">
        {state.items.map((item) => {
          const isItemActive = state.activeItem === item.id;
          const itemTextColorClass = isItemActive
            ? 'text-gray-900 dark:text-white' // Active item: Dark gray in light mode, white in dark mode
            : 'text-gray-700 dark:text-gray-300'; // Inactive item: Default gray in light mode, lighter gray in dark mode

          return (
            <div
              key={item.id}
              className={`${controller.getItemStyles(isItemActive)} ${itemTextColorClass}`}
              onClick={() => handleItemClick(item)}
            >
              <item.icon size={20} className="shrink-0" />
              {!state.isCollapsed && (
                <>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};
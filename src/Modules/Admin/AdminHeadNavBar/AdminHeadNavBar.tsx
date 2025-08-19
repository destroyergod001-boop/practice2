import { Button } from '@core/ui/Button'; // Import the Button component

interface AdminHeadNavBarProps {
  onCollapseToggle: () => void;
  onSignOut: () => void; // Add onSignOut prop
}

export default function AdminHeadNavBar({ onCollapseToggle, onSignOut }: AdminHeadNavBarProps) {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onCollapseToggle}
          className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none"
        >
         <div> x </div>
        </button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Panel</h1>
      </div>
      <div className=" pl-[30px] flex items-center space-x-4 ">
        <span className="text-gray-700 dark:text-gray-300">Welcome, Admin!</span>
        
        <Button onClick={onSignOut} variant="outline" size="sm">Logout</Button>
        &emsp;&emsp;&emsp;
      </div>

    </nav>
  );
}
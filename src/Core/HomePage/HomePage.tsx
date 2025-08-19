import { FC } from 'react';
import {  Shield } from 'lucide-react';
import { PortalCard } from '../ui/PortalCard';
import { Page } from '../../App';
// import {AdminLogin} from '../../Modules/Admin/LoginPage/AdminLogin';
interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export const HomePage: FC<HomePageProps> = ({ onNavigate }) => {

  return (
    <div className="min-h-screen w-full transition-colors duration-500">
      <div className="container mx-auto px-4 py-20 flex flex-col items-center">
        <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Mystic Realms
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl text-center mb-16">
          Enter a world of magic, adventure, and endless possibilities. Choose your path and begin your legendary journey.
        </p>

        <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
         
          <PortalCard
            title="Admin Portal "
            description="Testing"
            icon={<Shield size={32} />}
            onClick={() => onNavigate('AdminLogin')}
            variantColor="purple"
          />
        </div>
      </div>
    </div>
  );
};

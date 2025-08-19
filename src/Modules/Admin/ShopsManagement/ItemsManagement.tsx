import { useState, } from 'react';
import { Button } from '@core/ui/Button';
import { Plus } from 'lucide-react';
import { ShopModal } from './ShopModal';
import { ShopModel } from '@core/Model/Shop';
import { ShopsList } from './components/ShopsList';

export function ShopsManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShop, setEditingShop] = useState<ShopModel | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setEditingShop(null);
    setIsModalOpen(true);
  };

  const handleEdit = (shop: ShopModel) => {
    setEditingShop(shop);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    // Trigger refresh of the list
    setRefreshKey(prev => prev + 1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingShop(null);
  };

  const handleSave = async () => {
    // Trigger refresh of the list
    setRefreshKey(prev => prev + 1);
    handleModalClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex shops-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shops Management</h1>
        <Button onClick={handleCreateNew} className="flex shops-center gap-2">
          <Plus size={20} />
          Create New Shop
        </Button>
      </div>

      <ShopsList
        key={refreshKey}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ShopModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        shop={editingShop}
      />
    </div>
  );
}
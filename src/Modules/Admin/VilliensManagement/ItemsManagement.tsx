import { useState, } from 'react';
import { Button } from '@core/ui/Button';
import { Plus } from 'lucide-react';
import { VillienModal } from './VillienModal';
import { VillienModel } from '@core/Model/Villien';
import { VilliensList } from './components/VilliensList';

export function VilliensManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVillien, setEditingVillien] = useState<VillienModel | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setEditingVillien(null);
    setIsModalOpen(true);
  };

  const handleEdit = (villien: VillienModel) => {
    setEditingVillien(villien);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    // Trigger refresh of the list
    setRefreshKey(prev => prev + 1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingVillien(null);
  };

  const handleSave = async () => {
    // Trigger refresh of the list
    setRefreshKey(prev => prev + 1);
    handleModalClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex villiens-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Villiens Management</h1>
        <Button onClick={handleCreateNew} className="flex villiens-center gap-2">
          <Plus size={20} />
          Create New Villien
        </Button>
      </div>

      <VilliensList
        key={refreshKey}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <VillienModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        villien={editingVillien}
      />
    </div>
  );
}
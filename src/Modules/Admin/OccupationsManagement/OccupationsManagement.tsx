import { useState, } from 'react';
import { Button } from '@core/ui/Button';
import { Plus } from 'lucide-react';
import { OccupationModal } from './OccupationModal';
import { OccupationModel } from '@core/Model/Occupation';
import { OccupationsList } from './components/OccupationsList';

export function OccupationsManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOccupation, setEditingOccupation] = useState<OccupationModel | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setEditingOccupation(null);
    setIsModalOpen(true);
  };

  const handleEdit = (occupation: OccupationModel) => {
    setEditingOccupation(occupation);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    // Trigger refresh of the list
    setRefreshKey(prev => prev + 1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingOccupation(null);
  };

  const handleSave = async () => {
    // Trigger refresh of the list
    setRefreshKey(prev => prev + 1);
    handleModalClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Occupations Management</h1>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={20} />
          Create New Occupation
        </Button>
      </div>

      <OccupationsList
        key={refreshKey}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <OccupationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        occupation={editingOccupation}
      />
    </div>
  );
}
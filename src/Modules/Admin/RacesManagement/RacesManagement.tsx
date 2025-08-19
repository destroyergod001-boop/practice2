import { useState, } from 'react';
import { Button } from '@core/ui/Button';
import { Plus } from 'lucide-react';
import { RaceModal } from './RaceModal';
import { RaceModel } from '@core/Model/Race';
import { RacesList } from './components/RacesList';

export function RacesManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRace, setEditingRace] = useState<RaceModel | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setEditingRace(null);
    setIsModalOpen(true);
  };

  const handleEdit = (race: RaceModel) => {
    setEditingRace(race);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    // Trigger refresh of the list
    setRefreshKey(prev => prev + 1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingRace(null);
  };

  const handleSave = async () => {
    // Trigger refresh of the list
    setRefreshKey(prev => prev + 1);
    handleModalClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Races Management</h1>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={20} />
          Create New Race
        </Button>
      </div>

      <RacesList
        key={refreshKey}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <RaceModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        race={editingRace}
      />
    </div>
  );
}
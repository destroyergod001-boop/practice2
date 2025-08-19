import { useState, } from 'react';
import { Button } from '@core/ui/Button';
import { Plus } from 'lucide-react';
import { MonsterModal } from './MonsterModal';
import { MonsterModel } from '@core/Model/Monster';
import { MonstersList } from './components/MonstersList';

export function MonstersManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMonster, setEditingMonster] = useState<MonsterModel | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setEditingMonster(null);
    setIsModalOpen(true);
  };

  const handleEdit = (monster: MonsterModel) => {
    setEditingMonster(monster);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    // Trigger refresh of the list
    setRefreshKey(prev => prev + 1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingMonster(null);
  };

  const handleSave = async () => {
    // Trigger refresh of the list
    setRefreshKey(prev => prev + 1);
    handleModalClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex monsters-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Monsters Management</h1>
        <Button onClick={handleCreateNew} className="flex monsters-center gap-2">
          <Plus size={20} />
          Create New Monster
        </Button>
      </div>

      <MonstersList
        key={refreshKey}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <MonsterModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        monster={editingMonster}
      />
    </div>
  );
}
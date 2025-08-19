import  { useState } from 'react';
import { Button } from '@core/ui/Button';
import { Plus } from 'lucide-react';
import { AbilityModal } from './AbilityModal';
import { AbilityModel } from '@core/Model/Ability';
import { AbilitiesList } from './components/AbilitiesList';

export function AbilitiesManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAbility, setEditingAbility] = useState<AbilityModel | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setEditingAbility(null);
    setIsModalOpen(true);
  };

  const handleEdit = (ability: AbilityModel) => {
    setEditingAbility(ability);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    // Trigger refresh of the list
    setRefreshKey(prev => prev + 1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAbility(null);
  };

  const handleSave = async () => {
    // Trigger refresh of the list
    setRefreshKey(prev => prev + 1);
    handleModalClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Abilities Management</h1>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={20} />
          Create New Ability
        </Button>
      </div>

      <AbilitiesList
        key={refreshKey}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AbilityModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        ability={editingAbility}
      />
    </div>
  );
}
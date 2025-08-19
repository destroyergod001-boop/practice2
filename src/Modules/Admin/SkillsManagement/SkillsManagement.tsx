import { useState, } from 'react';
import { Button } from '@core/ui/Button';
import { Plus } from 'lucide-react';
import { SkillModal } from './SkillModal';
import { SkillModel } from '@core/Model/Skill';
import { SkillsList } from './components/SkillsList';

export function SkillsManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillModel | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateNew = () => {
    setEditingSkill(null);
    setIsModalOpen(true);
  };

  const handleEdit = (skill: SkillModel) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    // Trigger refresh of the list
    setRefreshKey(prev => prev + 1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
  };

  const handleSave = async () => {
    // Trigger refresh of the list
    setRefreshKey(prev => prev + 1);
    handleModalClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Skills Management</h1>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={20} />
          Create New Skill
        </Button>
      </div>

      <SkillsList
        key={refreshKey}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SkillModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        skill={editingSkill}
      />
    </div>
  );
}
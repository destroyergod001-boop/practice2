import React, {  useEffect } from 'react';
import { Modal } from '@core/ui/Modal';
import { Button } from '@core/ui/Button';
import { Tabs, Tab } from '@core/ui/Tabs';
import { Alert } from '@core/ui/Alert';
import { SkillModel } from '@core/Model/Skill';
import { SkillBasicTab } from './SkillBasicTab';
import { StatsInputGroup } from '../AdminCommonComponents/StatsInputGroup';
import { ElementsInputGroup } from '../AdminCommonComponents/ElementsInputGroup';
import { SkillAssetTab } from './SkillAssetTab';
import { useSkillModalController } from './controllers/SkillsModalController';

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  skill?: SkillModel | null;
}

export const SkillModal: React.FC<SkillModalProps> = ({
  isOpen,
  onClose,
  onSave,
  skill
}) => {
  const { state, controller } = useSkillModalController();

  useEffect(() => {
    controller.initializeSkill(skill);
  }, [skill, isOpen]);

  const handleSave = async () => {
    const success = await controller.saveSkill(skill);
    if (success) {
      onSave();
    }
  };

  const tabs: Tab[] = [
    { 
      id: 'basic', 
      label: 'Basic',
      content: (
        <SkillBasicTab
          data={state.skillData}
          onChange={controller.updateSkillData.bind(controller)}
          errors={state.errors}
        />
      )
    },
    { 
      id: 'stats', 
      label: 'Stats',
      content: (
        <div className="space-y-6">
          <StatsInputGroup
            data={state.skillData}
            onChange={controller.updateSkillData.bind(controller)}
            jsonFieldKey="basic_stats"
            title="Basic Stats"
            description="Base statistical bonuses provided by this skill"
          />
        
          <StatsInputGroup
            data={state.skillData}
            onChange={controller.updateSkillData.bind(controller)}
            jsonFieldKey="requirement_stats"
            title="Requirement Stats"
            description="Minimum stats required to use this skill"
          />
        </div>
      )
    },
    { 
      id: 'elements', 
      label: 'Elements',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ElementsInputGroup
            data={state.skillData}
            onChange={controller.updateSkillData.bind(controller)}
            jsonFieldKey="element_mastery"
            title="Element Mastery"
            description="Elemental mastery bonuses provided by this skill"
          />
          <ElementsInputGroup
            data={state.skillData}
            onChange={controller.updateSkillData.bind(controller)}
            jsonFieldKey="element_resistance"
            title="Element Resistance"
            description="Elemental resistance bonuses provided by this skill"
          />
          <ElementsInputGroup
            data={state.skillData}
            onChange={controller.updateSkillData.bind(controller)}
            jsonFieldKey="requirement_element_mastery"
            title="Required Element Mastery"
            description="Minimum elemental mastery required to use this skill"
          />
          <ElementsInputGroup
            data={state.skillData}
            onChange={controller.updateSkillData.bind(controller)}
            jsonFieldKey="requirement_element_resistance"
            title="Required Element Resistance"
            description="Minimum elemental resistance required to use this skill"
          />
        </div>
      )
    },
    { 
      id: 'asset', 
      label: 'Asset',
      content: (
        <SkillAssetTab
          data={state.skillData}
          onChange={controller.updateSkillData.bind(controller)}
        />
      )
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={skill ? 'Edit Skill' : 'Create New Skill'}
      size="5xl"
    >
      <div className="space-y-6">

        {/* Error Alert */}
        {state.errors.general && (
          <Alert variant="error" dismissible onDismiss={() => controller.clearGeneralError()}>
            {state.errors.general}
          </Alert>
        )}

        {/* Tabs */}
        <div >
          <Tabs
            tabs={tabs}
            defaultTab={state.activeTab}
            onChange={(tabId) => controller.setActiveTab(tabId as any)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={state.loading}>
            {skill ? 'Update' : 'Create'} Skill
          </Button>
        </div>
      </div>
    </Modal>
  );
};
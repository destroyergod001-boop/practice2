import React, {  useEffect } from 'react';
import { Modal } from '@core/ui/Modal';
import { Button } from '@core/ui/Button';
import { Tabs, Tab } from '@core/ui/Tabs';
import { Alert } from '@core/ui/Alert';
import { VillienModel } from '@core/Model/Villien';
import { VillienBasicTab } from './VillienBasicTab';
import { StatsInputGroup } from '../AdminCommonComponents/StatsInputGroup';
import { ElementsInputGroup } from '../AdminCommonComponents/ElementsInputGroup';
import { VillienAssetTab } from './VillienAssetTab';
import { useVillienModalController } from './controllers/VilliensModalController';

interface VillienModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  villien?: VillienModel | null;
}

export const VillienModal: React.FC<VillienModalProps> = ({
  isOpen,
  onClose,
  onSave,
  villien
}) => {
  const { state, controller } = useVillienModalController();

  useEffect(() => {
    controller.initializeVillien(villien);
  }, [villien, isOpen]);

  const handleSave = async () => {
    const success = await controller.saveVillien(villien);
    if (success) {
      onSave();
    }
  };

  const tabs: Tab[] = [
    { 
      id: 'basic', 
      label: 'Basic',
      content: (
        <VillienBasicTab
          data={state.villienData}
          onChange={controller.updateVillienData.bind(controller)}
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
            data={state.villienData}
            onChange={controller.updateVillienData.bind(controller)}
            jsonFieldKey="basic_stats"
            title="Basic Stats"
            description="Base statistical bonuses provided by this villien"
          />
        
          <StatsInputGroup
            data={state.villienData}
            onChange={controller.updateVillienData.bind(controller)}
            jsonFieldKey="requirement_stats"
            title="Requirement Stats"
            description="Minimum stats required to use this villien"
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
            data={state.villienData}
            onChange={controller.updateVillienData.bind(controller)}
            jsonFieldKey="element_mastery"
            title="Element Mastery"
            description="Elemental mastery bonuses provided by this villien"
          />
          <ElementsInputGroup
            data={state.villienData}
            onChange={controller.updateVillienData.bind(controller)}
            jsonFieldKey="element_resistance"
            title="Element Resistance"
            description="Elemental resistance bonuses provided by this villien"
          />
          <ElementsInputGroup
            data={state.villienData}
            onChange={controller.updateVillienData.bind(controller)}
            jsonFieldKey="requirement_element_mastery"
            title="Required Element Mastery"
            description="Minimum elemental mastery required to use this villien"
          />
          <ElementsInputGroup
            data={state.villienData}
            onChange={controller.updateVillienData.bind(controller)}
            jsonFieldKey="requirement_element_resistance"
            title="Required Element Resistance"
            description="Minimum elemental resistance required to use this villien"
          />
        </div>
      )
    },
    { 
      id: 'asset', 
      label: 'Asset',
      content: (
        <VillienAssetTab
          data={state.villienData}
          onChange={controller.updateVillienData.bind(controller)}
        />
      )
    }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={villien ? 'Edit Villien' : 'Create New Villien'}
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
            {villien ? 'Update' : 'Create'} Villien
          </Button>
        </div>
      </div>
    </Modal>
  );
};
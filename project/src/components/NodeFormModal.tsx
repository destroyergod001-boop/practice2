import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Image, AlertTriangle } from 'lucide-react';
import { StoryNode, Choice } from '../types/story';

interface NodeFormModalProps {
  isOpen: boolean;
  node: StoryNode | null;
  availableNodes: StoryNode[];
  isNewNode?: boolean;
  onSave: (nodeData: Partial<StoryNode>) => void;
  onDelete?: () => void;
  onClose: () => void;
}

export const NodeFormModal: React.FC<NodeFormModalProps> = ({
  isOpen,
  node,
  availableNodes,
  isNewNode = false,
  onSave,
  onDelete,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isEnding: false,
    image: '',
    choices: [] as Choice[],
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (node) {
      setFormData({
        title: node.title,
        content: node.content,
        isEnding: node.isEnding,
        image: node.image || '',
        choices: [...node.choices],
      });
    } else if (isNewNode) {
      setFormData({
        title: 'New Scene',
        content: 'Describe what happens here...',
        isEnding: false,
        image: '',
        choices: [],
      });
    }
  }, [node, isNewNode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addChoice = () => {
    const newChoice: Choice = {
      id: Date.now().toString(),
      text: 'New choice...',
      targetNodeId: availableNodes[0]?.id || '',
    };
    setFormData(prev => ({
      ...prev,
      choices: [...prev.choices, newChoice],
    }));
  };

  const updateChoice = (index: number, updates: Partial<Choice>) => {
    setFormData(prev => ({
      ...prev,
      choices: prev.choices.map((choice, i) => 
        i === index ? { ...choice, ...updates } : choice
      ),
    }));
  };

  const removeChoice = (index: number) => {
    setFormData(prev => ({
      ...prev,
      choices: prev.choices.filter((_, i) => i !== index),
    }));
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            {isNewNode ? 'Create New Node' : 'Edit Story Node'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Scene Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Scene Image URL (Optional)
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Scene Content *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              rows={6}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Describe what happens in this scene..."
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isEnding}
                onChange={(e) => setFormData(prev => ({ ...prev, isEnding: e.target.checked }))}
                className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-gray-700"
              />
              <span className="text-gray-300">This is an ending scene</span>
            </label>
          </div>

          {!formData.isEnding && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Player Choices</h3>
                <button
                  type="button"
                  onClick={addChoice}
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Choice</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.choices.map((choice, index) => (
                  <div key={choice.id} className="bg-gray-700 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Choice Text *
                        </label>
                        <input
                          type="text"
                          value={choice.text}
                          onChange={(e) => updateChoice(index, { text: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-amber-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Target Scene *
                        </label>
                        <select
                          value={choice.targetNodeId}
                          onChange={(e) => updateChoice(index, { targetNodeId: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:ring-2 focus:ring-amber-500"
                          required
                        >
                          <option value="">Select target scene...</option>
                          {availableNodes.map((availableNode) => (
                            <option key={availableNode.id} value={availableNode.id}>
                              {availableNode.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => removeChoice(index)}
                      className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Remove Choice</span>
                    </button>
                  </div>
                ))}

                {formData.choices.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <p>No choices added yet. Add at least one choice for players to continue the story.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6 border-t border-gray-700">
            <div>
              {!isNewNode && onDelete && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Node</span>
                </button>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>{isNewNode ? 'Create Node' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <h3 className="text-lg font-semibold text-white">Confirm Deletion</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this node? This action cannot be undone and may break story connections.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
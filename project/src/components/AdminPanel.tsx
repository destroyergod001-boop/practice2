import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Download, Upload, ArrowLeft, BookOpen, Network, Eye, Settings, BarChart3 } from 'lucide-react';
import { Story, StoryNode } from '../types/story';
import { StoryFormModal } from './StoryFormModal';
import { NodeFormModal } from './NodeFormModal';
import { FlowVisualization } from './flow/FlowVisualization';
import { IssuePanel } from './flow/IssuePanel';
import { exportStory, importStory } from '../utils/storage';


interface AdminPanelProps {
  stories: Record<string, Story>;
  onStoryUpdate: (story: Story) => void;
  onStoryDelete: (storyId: string) => void;
}

interface AdminPanelProps {
  stories: Record<string, Story>;
  onStoryUpdate: (story: Story) => void;
  onStoryDelete: (storyId: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  stories,
  onStoryUpdate,
  onStoryDelete,
}) => {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showNodeModal, setShowNodeModal] = useState(false);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [isCreatingNewNode, setIsCreatingNewNode] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'flow' | 'issues'>('overview');

  /**
   * Creates a new story with default structure
   */
  const createNewStory = () => {
    const newStory: Story = {
      id: Date.now().toString(),
      title: 'New Story',
      description: 'A new adventure awaits...',
      author: 'Anonymous',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      startNodeId: 'start',
      nodes: {
        start: {
          id: 'start',
          title: 'The Beginning',
          content: 'Your adventure starts here...',
          choices: [],
          isEnding: false,
        },
      },
      tags: [],
      difficulty: 'easy',
    };
    
    onStoryUpdate(newStory);
    setSelectedStory(newStory.id);
  };

  /**
   * Updates an existing story with new data
   */
  const handleStoryUpdate = (storyId: string, updates: Partial<Story>) => {
    const story = stories[storyId];
    if (story) {
      onStoryUpdate({
        ...story,
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  /**
   * Saves a story node (new or existing)
   */
  const handleNodeSave = (storyId: string, nodeData: Partial<StoryNode>) => {
    const story = stories[storyId];
    if (!story) return;

    if (isCreatingNewNode) {
      const newNodeId = `node_${Date.now()}`;
      const newNode: StoryNode = {
        id: newNodeId,
        title: nodeData.title || 'New Scene',
        content: nodeData.content || '',
        choices: nodeData.choices || [],
        isEnding: nodeData.isEnding || false,
        image: nodeData.image,
      };

      handleStoryUpdate(storyId, {
        nodes: {
          ...story.nodes,
          [newNodeId]: newNode,
        },
      });
    } else if (editingNodeId) {
      const existingNode = story.nodes[editingNodeId];
      if (existingNode) {
        handleStoryUpdate(storyId, {
          nodes: {
            ...story.nodes,
            [editingNodeId]: {
              ...existingNode,
              ...nodeData,
            },
          },
        });
      }
    }

    setShowNodeModal(false);
    setEditingNodeId(null);
    setIsCreatingNewNode(false);
  };

  /**
   * Deletes a story node with validation
   */
  const handleNodeDelete = (storyId: string, nodeId: string) => {
    const story = stories[storyId];
    if (!story) return;

    // Don't allow deletion if it's the only node
    if (Object.keys(story.nodes).length <= 1) {
      alert('Cannot delete the only node in the story.');
      return;
    }

    // Don't allow deletion of the start node without changing it first
    if (story.startNodeId === nodeId) {
      alert('Cannot delete the starting node. Please set a different starting node first.');
      return;
    }

    const { [nodeId]: deletedNode, ...remainingNodes } = story.nodes;
    
    // Remove references to this node from other nodes' choices
    const updatedNodes = Object.fromEntries(
      Object.entries(remainingNodes).map(([id, node]) => [
        id,
        {
          ...node,
          choices: node.choices.filter(choice => choice.targetNodeId !== nodeId),
        },
      ])
    );

    handleStoryUpdate(storyId, {
      nodes: updatedNodes,
    });

    setShowNodeModal(false);
    setEditingNodeId(null);
  };

  /**
   * Opens the node editing modal
   */
  const openNodeModal = (nodeId: string) => {
    setEditingNodeId(nodeId);
    setIsCreatingNewNode(false);
    setShowNodeModal(true);
  };

  /**
   * Opens modal for creating a new node
   */
  const openNewNodeModal = () => {
    setEditingNodeId(null);
    setIsCreatingNewNode(true);
    setShowNodeModal(true);
  };

  /**
   * Handles story file import
   */
  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const story = await importStory(file);
        onStoryUpdate(story);
        setSelectedStory(story.id);
      } catch (error) {
        alert('Failed to import story. Please check the file format.');
      }
    }
  };

  /**
   * Calculates the number of incoming connections for a node
   */
  const getNodeConnections = (story: Story, nodeId: string): number => {
    return Object.values(story.nodes).reduce((count, node) => {
      return count + node.choices.filter(choice => choice.targetNodeId === nodeId).length;
    }, 0);
  };

  /**
   * Handles node selection from flow visualization or issue panel
   */
  const handleNodeSelect = (nodeId: string) => {
    openNodeModal(nodeId);
  };

  // Story editing view
  if (selectedStory && stories[selectedStory]) {
    const story = stories[selectedStory];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedStory(null)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Stories</span>
          </button>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowStoryModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Story Settings</span>
            </button>
            <button
              onClick={() => exportStory(story)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Story Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{story.title}</h2>
              <p className="text-gray-300 mb-3">{story.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>by {story.author}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  story.difficulty === 'easy' ? 'bg-green-600' :
                  story.difficulty === 'medium' ? 'bg-yellow-600' : 'bg-red-600'
                } text-white`}>
                  {story.difficulty}
                </span>
                <span>{Object.keys(story.nodes).length} scenes</span>
              </div>
            </div>
          </div>

          {story.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {story.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-amber-600 text-white rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-700/50 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'overview'
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-600'
              }`}
            >
              <Eye className="h-4 w-4" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('flow')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'flow'
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-600'
              }`}
            >
              <Network className="h-4 w-4" />
              <span>Flow Chart</span>
            </button>
            <button
              onClick={() => setActiveTab('issues')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'issues'
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-600'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analysis</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">Story Scenes</h3>
              <button
                onClick={openNewNodeModal}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Scene</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(story.nodes).map((node) => {
                const incomingConnections = getNodeConnections(story, node.id);
                const isStartNode = story.startNodeId === node.id;
                
                return (
                  <div key={node.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-650 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-white truncate pr-2">{node.title}</h4>
                      <button
                        onClick={() => openNodeModal(node.id)}
                        className="text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {node.image && (
                      <div className="mb-3">
                        <img 
                          src={node.image} 
                          alt={node.title}
                          className="w-full h-20 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">{node.content}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">{node.choices.length} choices</span>
                        <span className="text-gray-400">{incomingConnections} incoming</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {isStartNode && (
                          <span className="px-2 py-1 bg-green-600 text-white rounded text-xs">Start</span>
                        )}
                        {node.isEnding && (
                          <span className="px-2 py-1 bg-red-600 text-white rounded text-xs">Ending</span>
                        )}
                        {incomingConnections === 0 && !isStartNode && (
                          <span className="px-2 py-1 bg-yellow-600 text-white rounded text-xs">Orphaned</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'flow' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-white">Story Flow Visualization</h3>
                <button
                  onClick={openNewNodeModal}
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Scene</span>
                </button>
              </div>
              <p className="text-gray-300 mb-4">
                Interactive flowchart showing your story structure. Red nodes indicate issues, 
                yellow nodes have warnings, and green indicates the start node.
              </p>
              <FlowVisualization
                story={story}
                onNodeClick={handleNodeSelect}
                onNodeEdit={handleNodeSelect}
              />
            </div>
          </div>
        )}

        {activeTab === 'issues' && (
          <IssuePanel
            story={story}
            onNodeSelect={handleNodeSelect}
          />
        )}

        {/* Modals */}
        <StoryFormModal
          isOpen={showStoryModal}
          story={story}
          onSave={(updates) => handleStoryUpdate(selectedStory, updates)}
          onClose={() => setShowStoryModal(false)}
        />

        <NodeFormModal
          isOpen={showNodeModal}
          node={editingNodeId ? story.nodes[editingNodeId] : null}
          availableNodes={Object.values(story.nodes)}
          isNewNode={isCreatingNewNode}
          onSave={(nodeData) => handleNodeSave(selectedStory, nodeData)}
          onDelete={editingNodeId ? () => handleNodeDelete(selectedStory, editingNodeId) : undefined}
          onClose={() => {
            setShowNodeModal(false);
            setEditingNodeId(null);
            setIsCreatingNewNode(false);
          }}
        />
      </div>
    );
  }

  // Story list view
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Story Administration</h2>
          <p className="text-gray-300">Create and manage your interactive stories</p>
        </div>
        <div className="flex space-x-3">
          <label className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer">
            <Upload className="h-4 w-4" />
            <span>Import Story</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>
          <button
            onClick={createNewStory}
            className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Story</span>
          </button>
        </div>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(stories).map((story) => (
          <div key={story.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 border border-gray-700 hover:border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white truncate pr-2">{story.title}</h3>
              <button
                onClick={() => onStoryDelete(story.id)}
                className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            
            <p className="text-gray-300 mb-4 line-clamp-3">{story.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <span>by {story.author}</span>
              <span className={`px-2 py-1 rounded text-xs ${
                story.difficulty === 'easy' ? 'bg-green-600' :
                story.difficulty === 'medium' ? 'bg-yellow-600' : 'bg-red-600'
              } text-white`}>
                {story.difficulty}
              </span>
            </div>

            {story.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {story.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-amber-600/20 text-amber-300 rounded text-xs">
                    {tag}
                  </span>
                ))}
                {story.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded text-xs">
                    +{story.tags.length - 3}
                  </span>
                )}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">
                {Object.keys(story.nodes).length} scenes
              </span>
              <button
                onClick={() => setSelectedStory(story.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>Manage</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {Object.keys(stories).length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-medium text-gray-400 mb-4">No stories yet</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Create your first interactive story to get started. Build branching narratives with multiple paths and endings.
          </p>
          <button
            onClick={createNewStory}
            className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Create Your First Story
          </button>
        </div>
      )}
    </div>
  );
};